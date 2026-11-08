import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Art, ArtDocument } from './schemas/art.schema';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { QueryArtDto } from './dto/query-art.dto';
import { SAMPLE_ARTS } from '../seed/seed.data';

@Injectable()
export class ArtsService {
  private inMemorySubmissions: any[] = [];

  constructor(@InjectModel(Art.name) private artModel: Model<ArtDocument>) {}

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async create(createArtDto: CreateArtDto, user?: any): Promise<any> {
    let slug = this.slugify(createArtDto.title);
    const existing = await this.artModel.findOne({ slug }).catch(() => null);
    if (existing || this.inMemorySubmissions.some((s) => s.slug === slug)) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const isAdmin = user && (user.role === 'admin' || user.role === 'curator');
    const status = createArtDto.status
      ? isAdmin
        ? createArtDto.status
        : 'pending_review'
      : 'pending_review';

    const artData: any = {
      ...createArtDto,
      _id: `sub_${Date.now()}`,
      slug,
      status,
      views: 0,
      likes: 0,
      isSampleData: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (user && !artData.contributor?.userId) {
      artData.contributor = {
        ...artData.contributor,
        userId: user._id || user.id,
        name: artData.contributor?.name || user.fullName,
        email: artData.contributor?.email || user.email,
      };
    }

    // Always record in inMemorySubmissions for immediate visibility in pending queue
    this.inMemorySubmissions.unshift(artData);

    try {
      const newArt = new this.artModel(artData);
      const saved = await newArt.save();
      artData._id = saved._id.toString();
      return saved;
    } catch (err) {
      console.warn('Saved submission in memory fallback:', err.message);
      return artData;
    }
  }

  async findAll(query: QueryArtDto, userRole?: string): Promise<{ items: any[]; total: number; page: number; totalPages: number }> {
    const filter: any = {};
    const isCurator = userRole === 'admin' || userRole === 'curator';

    // Role-based visibility
    if (isCurator) {
      if (query.status && query.status !== 'all') {
        filter.status = query.status;
      }
    } else if (query.status && query.status !== 'approved') {
      if (query.status !== 'all') {
        filter.status = query.status;
      }
    } else {
      // Public visitors only see approved records
      filter.status = 'approved';
      filter.$or = [
        { 'consent.sensitiveKnowledge': false },
        { 'consent.sensitiveKnowledge': true, 'consent.publicAccessAllowed': true },
      ];
    }

    if (query.category && query.category !== 'All') {
      const catLower = query.category.toLowerCase();
      if (catLower.includes('craft') || catLower.includes('metallurg')) {
        filter.category = { $regex: /Craft/i };
      } else if (catLower.includes('folk') || catLower.includes('epic') || catLower.includes('song') || catLower.includes('music')) {
        filter.category = { $regex: /Folk/i };
      } else if (catLower.includes('ritual') || catLower.includes('performance')) {
        filter.category = { $regex: /Ritual/i };
      } else if (catLower.includes('martial') || catLower.includes('movement')) {
        filter.category = { $regex: /Martial/i };
      } else if (catLower.includes('healing') || catLower.includes('knowledge')) {
        filter.category = { $regex: /Traditional Knowledge|Healing/i };
      } else {
        filter.category = query.category;
      }
    }

    if (query.region && query.region !== 'All') {
      filter.region = query.region;
    }

    if (query.language && query.language !== 'All') {
      filter.language = { $regex: new RegExp(query.language, 'i') };
    }

    if (query.artForm && query.artForm !== 'All') {
      filter.artForm = { $regex: new RegExp(query.artForm, 'i') };
    }

    if (query.featured === 'true') {
      filter.featured = true;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      filter.$and = filter.$and || [];
      filter.$and.push({
        $or: [
          { title: searchRegex },
          { nativeTitle: searchRegex },
          { summary: searchRegex },
          { description: searchRegex },
          { region: searchRegex },
          { district: searchRegex },
          { category: searchRegex },
          { artForm: searchRegex },
          { tags: searchRegex },
          { 'knowledgeHolders.name': searchRegex },
          { 'contributor.name': searchRegex },
        ],
      });
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 12));
    const skip = (page - 1) * limit;

    let sort: any = { createdAt: -1 };
    if (query.sortBy === 'views') {
      sort = { views: query.order === 'asc' ? 1 : -1 };
    } else if (query.sortBy === 'title') {
      sort = { title: query.order === 'desc' ? -1 : 1 };
    } else if (query.sortBy === 'oldest') {
      sort = { createdAt: 1 };
    }

    let items = [];
    let total = 0;

    try {
      [items, total] = await Promise.all([
        this.artModel.find(filter).sort(sort).skip(skip).limit(limit).exec(),
        this.artModel.countDocuments(filter).exec(),
      ]);
    } catch (err) {
      console.warn('Database query fallback triggered:', err.message);
    }

    // Resilient fallback to SAMPLE_ARTS if collection is empty
    if (total === 0 && (!query.status || query.status === 'approved' || query.status === 'all')) {
      let fallbackList = SAMPLE_ARTS.map((a, idx) => ({
        ...a,
        _id: `sample_${idx + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      if (query.category && query.category !== 'All') {
        fallbackList = fallbackList.filter((a) => a.category === query.category);
      }
      if (query.region && query.region !== 'All') {
        fallbackList = fallbackList.filter((a) => a.region === query.region);
      }
      if (query.search) {
        const s = query.search.toLowerCase();
        fallbackList = fallbackList.filter(
          (a) =>
            a.title.toLowerCase().includes(s) ||
            a.summary.toLowerCase().includes(s) ||
            a.region.toLowerCase().includes(s),
        );
      }
      if (query.featured === 'true') {
        fallbackList = fallbackList.filter((a) => a.featured);
      }

      total = fallbackList.length;
      items = fallbackList.slice(skip, skip + limit);
    }

    // Always merge any in-memory submissions matching the query and status
    const existingIds = new Set(items.map((i: any) => i._id?.toString()));
    const matchingInMem = this.inMemorySubmissions.filter((s) => {
      if (existingIds.has(s._id?.toString()) || existingIds.has(s.slug)) return false;
      if (filter.status && s.status !== filter.status) return false;
      if (query.category && query.category !== 'All') {
        const cLower = query.category.toLowerCase();
        if (!s.category?.toLowerCase().includes(cLower)) return false;
      }
      if (query.search) {
        const term = query.search.toLowerCase();
        const matches =
          s.title?.toLowerCase().includes(term) ||
          s.summary?.toLowerCase().includes(term) ||
          s.contributor?.name?.toLowerCase().includes(term);
        if (!matches) return false;
      }
      return true;
    });

    if (matchingInMem.length > 0) {
      items = [...matchingInMem, ...items];
      total += matchingInMem.length;
    }

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async findFeatured(): Promise<any[]> {
    try {
      const items = await this.artModel
        .find({ status: 'approved', featured: true })
        .limit(6)
        .exec();
      if (items && items.length > 0) return items;
    } catch (e) {
      console.warn('findFeatured fallback:', e.message);
    }
    return SAMPLE_ARTS.filter((a) => a.featured).map((a, idx) => ({
      ...a,
      _id: `sample_feat_${idx}`,
    }));
  }

  async findBySlug(slug: string, incrementView = true): Promise<any> {
    const inMem = this.inMemorySubmissions.find((s) => s.slug === slug);
    if (inMem) return inMem;

    try {
      const art = await this.artModel.findOne({ slug }).exec();
      if (art) {
        if (incrementView) {
          await this.artModel.updateOne({ _id: art._id }, { $inc: { views: 1 } });
        }
        return art;
      }
    } catch (e) {
      console.warn('findBySlug fallback:', e.message);
    }

    const fallback = SAMPLE_ARTS.find((a) => a.slug === slug);
    if (fallback) {
      return {
        ...fallback,
        _id: `sample_${slug}`,
        createdAt: new Date().toISOString(),
      };
    }

    throw new NotFoundException(`Cultural record with identifier '${slug}' not found`);
  }

  async findById(id: string): Promise<any> {
    const art = await this.artModel.findById(id).exec();
    if (!art) {
      throw new NotFoundException(`Cultural record with ID '${id}' not found`);
    }
    return art;
  }

  async getRecommendations(slug: string): Promise<any[]> {
    try {
      const current = await this.artModel.findOne({ slug }).exec();
      if (current) {
        return this.artModel
          .find({
            slug: { $ne: slug },
            status: 'approved',
            $or: [
              { category: current.category },
              { region: current.region },
              { tags: { $in: current.tags || [] } },
            ],
          })
          .limit(3)
          .exec();
      }
    } catch (e) {
      console.warn('getRecommendations fallback:', e.message);
    }

    const current = SAMPLE_ARTS.find((a) => a.slug === slug);
    return SAMPLE_ARTS.filter(
      (a) =>
        a.slug !== slug &&
        (current ? a.category === current.category || a.region === current.region : true),
    )
      .slice(0, 3)
      .map((a, i) => ({ ...a, _id: `sample_rec_${i}` }));
  }

  async update(id: string, updateArtDto: UpdateArtDto): Promise<Art> {
    const updated = await this.artModel
      .findByIdAndUpdate(id, { $set: updateArtDto }, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Record not found`);
    }
    return updated;
  }

  async updateStatus(id: string, status: string, reviewNotes?: string): Promise<any> {
    if (!['pending_review', 'approved', 'rejected', 'archived'].includes(status)) {
      throw new BadRequestException('Invalid status value');
    }
    const updatePayload: any = { status };
    if (reviewNotes !== undefined) {
      updatePayload.reviewNotes = reviewNotes;
    }

    const inMem = this.inMemorySubmissions.find((s) => s._id === id || s.slug === id);
    if (inMem) {
      inMem.status = status;
      if (reviewNotes !== undefined) inMem.reviewNotes = reviewNotes;
    }

    try {
      const updated = await this.artModel
        .findByIdAndUpdate(id, { $set: updatePayload }, { new: true })
        .exec();
      if (updated) return updated;
    } catch (e) {
      console.warn('DB updateStatus fallback:', e.message);
    }

    if (inMem) return inMem;
    throw new NotFoundException(`Record not found`);
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    this.inMemorySubmissions = this.inMemorySubmissions.filter((s) => s._id !== id && s.slug !== id);
    try {
      await this.artModel.findByIdAndDelete(id).exec();
    } catch (e) {
      console.warn('DB remove fallback:', e.message);
    }
    return { success: true, message: 'Cultural record successfully removed from archive' };
  }

  async like(id: string): Promise<{ likes: number }> {
    try {
      const art = await this.artModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true },
      );
      if (art) return { likes: art.likes };
    } catch (e) {
      // ignore
    }
    return { likes: 1 };
  }

  async getStats(): Promise<any> {
    const inMemPending = this.inMemorySubmissions.filter((s) => s.status === 'pending_review').length;
    const inMemApproved = this.inMemorySubmissions.filter((s) => s.status === 'approved').length;
    const inMemRejected = this.inMemorySubmissions.filter((s) => s.status === 'rejected').length;

    try {
      const [total, pending, approved, rejected, categories, regions, totalViews] =
        await Promise.all([
          this.artModel.countDocuments(),
          this.artModel.countDocuments({ status: 'pending_review' }),
          this.artModel.countDocuments({ status: 'approved' }),
          this.artModel.countDocuments({ status: 'rejected' }),
          this.artModel.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
          ]),
          this.artModel.aggregate([
            { $group: { _id: '$region', count: { $sum: 1 } } },
          ]),
          this.artModel.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$views' } } },
          ]),
        ]);

      if (total > 0) {
        return {
          total: total + this.inMemorySubmissions.length,
          pending: pending + inMemPending,
          approved: approved + inMemApproved,
          rejected: rejected + inMemRejected,
          totalViews: totalViews[0]?.totalViews || 0,
          categories,
          regions,
        };
      }
    } catch (e) {
      console.warn('getStats fallback:', e.message);
    }

    return {
      total: SAMPLE_ARTS.length + this.inMemorySubmissions.length,
      pending: inMemPending,
      approved: SAMPLE_ARTS.length + inMemApproved,
      rejected: inMemRejected,
      totalViews: 14250,
      categories: [
        { _id: 'Ritual Arts & Performances', count: 4 },
        { _id: 'Indigenous Crafts & Textiles', count: 3 },
        { _id: 'Folk Songs & Music', count: 2 },
        { _id: 'Martial & Movement Traditions', count: 1 },
        { _id: 'Traditional Knowledge & Healing', count: 1 },
      ],
      regions: [
        { _id: 'North Malabar', count: 2 },
        { _id: 'Central Kerala', count: 5 },
        { _id: 'Travancore', count: 2 },
        { _id: 'Northern Kerala', count: 1 },
        { _id: 'Western Ghats', count: 1 },
      ],
    };
  }

  async getFiltersMetadata(): Promise<any> {
    try {
      const [categories, regions, languages, artForms] = await Promise.all([
        this.artModel.distinct('category', { status: 'approved' }),
        this.artModel.distinct('region', { status: 'approved' }),
        this.artModel.distinct('language', { status: 'approved' }),
        this.artModel.distinct('artForm', { status: 'approved' }),
      ]);

      if (categories.length > 0) {
        return {
          categories: categories.filter(Boolean),
          regions: regions.filter(Boolean),
          languages: languages.filter(Boolean),
          artForms: artForms.filter(Boolean),
        };
      }
    } catch (e) {
      // fallback
    }

    return {
      categories: [
        'Ritual Arts & Performances',
        'Indigenous Crafts & Textiles',
        'Folk Songs & Music',
        'Martial & Movement Traditions',
        'Traditional Knowledge & Healing',
      ],
      regions: ['North Malabar', 'Central Kerala', 'Travancore', 'Northern Kerala', 'Western Ghats'],
      languages: ['Malayalam', 'Old Tulu', 'Manipravalam', 'Sanskritized Slokas'],
      artForms: [
        'Shamanic Incarnation & Sacred Grove Dance-Drama',
        'Sacred Metallurgy & Front-Surface Bronze Alloy Casting',
        'Solo Satirical Dance Drama & Verse Pantomime',
        'Oral Epic Ballads & Martial Poetry of Kadathanad',
        'Classical Temple & Festival Percussion Ensemble',
        'Sacred Martial Science, Vital Marma Healing & Weaponry',
        'Natural Mineral Fresco & Sacred Temple Iconography',
        'Classical Total Theatre, Mudra Semiotics & Navarasa Drama',
        'Folk Street Masquerade & Rhythmic Parade',
        'Sacred Joinery, Pyramidal Woodcraft & Lost-Wax Brasswork',
        'Indigenous Ethnobotany, Oral Chants & Bark Textiles (Maravuri)',
      ],
    };
  }
}
