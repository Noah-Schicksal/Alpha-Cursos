import { UserRole } from "../entities/User";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                name: string;
                role: string;
            };
        }
    }
}
