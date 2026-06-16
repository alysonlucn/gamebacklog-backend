import bcrypt from "bcryptjs";
import { z } from "zod";
import { LoginUserDto } from "../dtos/login-user-dto";
import { UserRepository } from "../repositories/user-repository";
import { signToken } from "../utils/jwt";
import { toPublicUser } from "../utils/user-response";

const loginSchema = z.object({
  email: z.string().trim().email("email must be valid"),
  password: z.string().min(1, "password is required"),
});

export class LoginUserService {
  async execute(data: unknown) {
    const parsed = loginSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "invalid data");
    }

    const validatedData: LoginUserDto = parsed.data;

    const user = await UserRepository.findOne({
      where: { email: validatedData.email },
    });

    if (!user) {
      throw new Error("invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
      validatedData.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new Error("invalid email or password");
    }

    const token = signToken(user.id, user.email);

    return {
      user: toPublicUser(user),
      token,
    };
  }
}
