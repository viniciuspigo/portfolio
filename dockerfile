FROM node:22

# (Opcional) timezone
ENV TZ=America/Sao_Paulo

WORKDIR /app

# Copia apenas package primeiro para aproveitar cache
COPY package*.json ./

# Atualiza npm (opcional)
# RUN npm install -g npm@latest

# Instala dependências
RUN npm install

# Copia o resto do projeto
COPY . .

# Build do Vite (gera /dist)
RUN npm run build

# Instala um servidor estático simples
RUN npm install -g serve

# Porta que o container vai escutar (padrão 3000)
EXPOSE 3000

# Serve a pasta dist (SPA)
CMD ["serve", "-s", "dist", "-l", "3000"]