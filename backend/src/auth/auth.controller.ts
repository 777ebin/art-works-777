import { Controller, Post, Get, Body, Req, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      fullName: string;
      role?: string;
      affiliation?: string;
      bio?: string;
      communityOrLineage?: string;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get('me')
  async me(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authentication token');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      return this.authService.getProfile(decoded.sub);
    } catch {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }
  }

  @Get('contributors')
  async getContributors() {
    return this.authService.getAllContributors();
  }
}

