export default interface AuthServiceInterface {
    login(email: string, password: string): Promise<string>
  }