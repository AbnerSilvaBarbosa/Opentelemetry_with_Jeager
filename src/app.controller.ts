import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { trace, context } from '@opentelemetry/api'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const hello = this.appService.getHello()
    return hello
  }

  @Post()
  postHello(@Body() body: { value: string }): { value: string } {
    // Obtém o span ativo a partir do contexto atual
    const currentSpan = trace.getSpan(context.active())

    // Adiciona o body da requisição como um atributo ao span, se o span atual existir
    if (currentSpan) {
      currentSpan.setAttribute('http.request.body', JSON.stringify(body))
    }

    return { value: body.value }
  }

  @Get('users')
  async getUsers() {
    return await this.appService.getUsers()
  }
}
