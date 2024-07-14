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
import { ValidationPipe } from "@nestjs/common"
import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk"

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

    console.log(keysConfig().ssl.cert)

    const app = await NestFactory.create(AppModule, {
        httpsOptions,
    })

    app.enableCors()
 
    app.useGlobalPipes(new ValidationPipe({transform: true}))

    // const x = { balance: 55, totalBonus: 66, timestamp: '2024-12-05T00:00:00' }
    // console.log(Account.fromPrivateKey({
    //     privateKey: new Ed25519PrivateKey("0x6fca26e2f8f2205cfafe75af34bae9d786224f2cad56bb0f674fdb13d0d6972e")
    // }).sign(JSON.stringify(x)).toString())

    const config = new DocumentBuilder()
        .setVersion("1.0")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("/api", app, document)
    
    await app.listen(appConfig().port || 9992)
}

generateSchema().then(() => bootstrap())
