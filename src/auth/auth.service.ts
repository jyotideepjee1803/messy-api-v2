import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signupDto: SignUpDto) {
    const { name, email, password, isAdmin } = signupDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await user.save();

    const token = await this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES'),
      },
    );

    return { _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin : user.isAdmin,
      token,
      /* Expire session after 15 days */
      expiryTime: Date.now() + 15 * 24 * 60 * 60 * 1000,};
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) throw new UnauthorizedException('invalid email or password');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('invalid email or password');

    const token = await this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return { _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin : user.isAdmin,
      token,
      /* Expire session after 15 days */
      expiryTime: Date.now() + 15 * 24 * 60 * 60 * 1000,};
  }

  async validateToken(token : string){
    const decodedToken = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET') });
    const user = await this.userModel.findById(decodedToken.id).select("-password");
    return user;
  }
}
