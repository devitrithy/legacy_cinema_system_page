FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV PORT 1111
ENV PUBLIC_API_ENDPOINT=http://26.204.37.36:3000
ENV PUBLIC_SECRET_GUEST_KEY=guest
ENV NODE_ENV=development
ENV JWT_SECRET="d26922dd-cd03-5d81-a660-1ec2e885f1e0"
RUN npm run build
EXPOSE 1111
CMD ["node","build"]