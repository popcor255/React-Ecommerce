import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

import * as express from 'express';
import * as session from 'express-session';

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }: any) => ({ req })
	});

	await createConnection();

	const app = express();

	app.use(
		session({
			secret: 'dev',
			resave: false,
			saveUninitialized: false
		})
	);

	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
};

startServer();
