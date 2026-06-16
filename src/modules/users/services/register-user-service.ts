import bcrypt from "bcryptjs";
import { z } from "zod";
import { RegisterUserDto } from "../dtos/register-user-dto";
import { UserRepository } from "../repositories/user-repository";
import { signToken } from "../utils/jwt";
import { toPublicUser } from "../utils/user-response";

const registerSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  email: z.string().trim().email("email must be valid"),
  password: z.string().min(6, "password must have at least 6 characters"),
});

export class RegisterUserService {
  async execute(data: unknown) {
    const parsed = registerSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.issues[0]?.message ?? "invalid data");
    }

    const validatedData: RegisterUserDto = parsed.data;

    const existingUser = await UserRepository.findOne({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      throw new Error("email already in use");
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    const user = UserRepository.create({
      name: validatedData.name,
      email: validatedData.email,
      passwordHash,
    });

    await UserRepository.save(user);

    const token = signToken(user.id, user.email);

    return {
      user: toPublicUser(user),
      token,
    };
  }
}
