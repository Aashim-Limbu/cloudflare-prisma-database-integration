import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
interface Env {
	DATABASE_URL: string;
}
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({
			datasources: {
				db: {
					url: env.DATABASE_URL,
				},
			},
		}).$extends(withAccelerate());
		const user = await prisma.user.findMany();
		return Response.json({ data: { user } });
	},
} satisfies ExportedHandler<Env>;
