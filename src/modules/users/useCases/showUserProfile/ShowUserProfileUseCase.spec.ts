import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

import {ShowUserProfileError} from './ShowUserProfileError'


let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Should be able to show user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
    );
    showUserProfileUseCase = new ShowUserProfileUseCase(
      usersRepositoryInMemory,
    );
  });
  it("Should be possible to show a user's profile", async () => {
    const userDTO = {
      name: "Lucas Lira",
      email: "lucasrocha446@gmail.com",
      password: "123senha",
    };
    const user = await createUserUseCase.execute(userDTO);

    const findUser = await showUserProfileUseCase.execute(user.id || "test")
    expect(findUser.name).toBe("Lucas Lira");
  });

  it("Shouldn't be able to show the profile of a non-existent user", async () => {
    expect(async () => {
      const userDTO = await createUserUseCase.execute({
        name: 'Lucas Lira',
        email: 'lucasrocha446@gmail.com',
        password: 'acesso@123'
      });

      const user = await createUserUseCase.execute(userDTO);

      await showUserProfileUseCase.execute("fakeid");
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
