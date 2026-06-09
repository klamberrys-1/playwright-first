El Flujo de CI/CD/CD (Continuous Deployment to Cloud)
Push: El desarrollador empuja código a main.

Orquestación (GitHub Actions): Se levanta un runner automatizado bajo entornos optimizados de Node.js 24 (LTS).

Ejecución Paralela: Playwright ejecuta las pruebas de forma aislada sobre tres motores nativos en simultáneo (Chromium, Firefox y WebKit).

Despliegue Serverless (AWS S3): Al finalizar (con éxito o fallo), el pipeline interactúa con el AWS CLI de forma segura a través de credenciales restringidas de IAM, sincronizando los reportes estáticos HTML y evidencias multimedia directamente en un bucket de Amazon S3 (Región Ohio).

Stack Tecnológico Utilizado
Lenguaje: TypeScript (Tipado fuerte para garantizar mantenibilidad).

Core Framework: Playwright Automation Tool Core.

Orquestador CI: GitHub Actions Workflow Engine.

Cloud Provider: AWS S3 (Hosting estático serverless) + AWS IAM (Políticas de mínimo privilegio).

Entorno: Node.js 24 (Estrategia proactiva ante deprecaciones).

Cómo Ejecutar este Proyecto Localmente
Prerrequisitos
Node.js v20 o superior instalado.

1. Clonar el repositorio e instalar dependencias limpias
git clone [https://github.com/TU_USUARIO_DE_GITHUB/TU_NOMBRE_DE_REPOSITORIO.git](https://github.com/TU_USUARIO_DE_GITHUB/TU_NOMBRE_DE_REPOSITORIO.git)
cd TU_NOMBRE_DE_REPOSITORIO
npm ci
2. Instalar los binarios de los navegadores de Playwright
npx playwright install --with-deps
3. Ejecutar las pruebas en modo visual (Headed)
npx playwright test --project=chromium --headed
4. Abrir el reporte local interactivo
npx playwright show-report
Diseñado y construido con un enfoque de eficiencia en procesos e infraestructura por Fabián González Pino – Ingeniero Civil Informático.

