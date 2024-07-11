import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface"
import { appConfig, keysConfig } from "@config"
import { getEnvValue } from "@common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { printSchema } from "graphql"
import { promises as fsPromises } from "fs"
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql"
import { join } from "path"
import { GameResolver } from "@resolvers"

const generateSchema = async () => {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([
        GameResolver
    ])
    
    await fsPromises.writeFile(
        join(
            process.cwd(),
            `${getEnvValue({ development: "src", production: "dist" })}/schema.gql`,
        ),
        printSchema(schema),
    )
}

const bootstrap = async () => {
    const httpsOptions: HttpsOptions = getEnvValue({
        production: {
            cert: keysConfig().ssl.cert,
            key: keysConfig().ssl.key,
        },
    })

    const app = await NestFactory.create(AppModule, {
        httpsOptions,
    })

    app.enableCors()

    const config = new DocumentBuilder()
        .setVersion("1.0")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("/api", app, document)
    
    await app.listen(appConfig().port || 9992)
}

generateSchema().then(() => bootstrap())
