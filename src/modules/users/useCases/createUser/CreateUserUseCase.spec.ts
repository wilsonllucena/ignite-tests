import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a user', async() => {
    const user = await createUserUseCase.execute({
      name: 'Lucas Lira',
      email: 'lucasrocha446@gmail.com',
      password: 'acesso@123'
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('password')
  });

  it('should not be able to create a user with exists email', async () => {
    expect(async () => {
      const user = {
        name: 'Lucas Lira',
        email: 'lucasrocha446@gmail.com',
        password: 'acesso@123'
      }

      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(CreateUserError)
  });
})
