import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface"
import { appConfig, keysConfig } from "@config"
import { getEnvValue } from "@common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

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
bootstrap()
