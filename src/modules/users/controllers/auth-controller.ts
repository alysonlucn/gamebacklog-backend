import { Request, Response } from "express";
import { LoginUserService } from "../services/login-user-service";
import { RegisterUserService } from "../services/register-user-service";
import { UserRepository } from "../repositories/user-repository";
import { toPublicUser } from "../utils/user-response";

export class AuthController {
  async register(request: Request, response: Response) {
    const registerUserService = new RegisterUserService();

    try {
      const result = await registerUserService.execute(request.body);
      return response.status(201).json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async login(request: Request, response: Response) {
    const loginUserService = new LoginUserService();

    try {
      const result = await loginUserService.execute(request.body);
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(401).json({ error: error.message });
    }
  }

  async me(request: Request, response: Response) {
    try {
      const user = await UserRepository.findOne({
        where: { id: request.userId },
      });

      if (!user) {
        return response.status(404).json({ error: "user not found" });
      }

      return response.status(200).json({ user: toPublicUser(user) });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
