# Next.js Authentication Scaffold

A complete, production-ready authentication system built with Next.js 15, TypeScript, and Tailwind CSS. This scaffold provides a solid foundation for building web applications with user authentication, featuring login, registration, protected routes, and a responsive UI.

## 🚀 Features

- **Complete Authentication Flow**: Login, registration, logout, and session management
- **Protected Routes**: Dashboard with authentication guards
- **Modern UI**: Responsive design with Tailwind CSS and custom icons
- **TypeScript Support**: Full type safety throughout the application
- **API Routes**: RESTful authentication endpoints
- **Context-based State Management**: React Context for authentication state
- **Form Validation**: Client-side validation with error handling
- **Mock Database**: In-memory user storage for development (easily replaceable)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/auth/          # Authentication API routes
│   │   ├── login/         # POST /api/auth/login
│   │   ├── register/      # POST /api/auth/register
│   │   ├── logout/        # POST /api/auth/logout
│   │   └── me/           # GET /api/auth/me (get current user)
│   ├── components/        # Reusable UI components
│   │   ├── Icon.tsx      # Custom icon component
│   │   └── Navbar.tsx    # Navigation bar with auth state
│   ├── contexts/         # React Context providers
│   │   └── AuthContext.tsx # Authentication state management
│   ├── dashboard/        # Protected dashboard page
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── about/           # About page
│   └── utils/           # Utility functions
```

## 🛠️ How It Works

### Authentication Flow

1. **Registration**: Users can create accounts with name, email, and password
2. **Login**: Users authenticate with email and password
3. **Token Management**: JWT tokens are stored in localStorage (development) or httpOnly cookies (production)
4. **Session Validation**: Protected routes check authentication status
5. **Logout**: Tokens are cleared and sessions invalidated

### State Management

The `AuthContext` provides:
- `user`: Current authenticated user data
- `isLoading`: Loading state for auth operations
- `login()`: Authenticate user and set session
- `register()`: Create new user account
- `logout()`: Clear session and redirect

### API Endpoints

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user data
- `POST /api/auth/logout` - Invalidate session

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd next-app-scaffold
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Test Accounts

The scaffold includes two pre-configured test accounts:
- **Email**: `john@example.com` **Password**: `password123`
- **Email**: `jane@example.com` **Password**: `password123`

## 🔗 Connecting to a Real Database

Currently, the application uses an in-memory mock database. To connect to a real database, follow these steps:

### 1. Choose Your Database

Popular options include:
- **PostgreSQL** with Prisma ORM
- **MongoDB** with Mongoose
- **MySQL** with Sequelize
- **SQLite** for development
- **AWS RDS** (PostgreSQL/MySQL)
- **AWS DocumentDB** (MongoDB-compatible)

### 2. Install Database Dependencies

**For PostgreSQL with Prisma:**
```bash
npm install prisma @prisma/client
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

**For MongoDB with Mongoose:**
```bash
npm install mongoose bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 3. Database Setup Examples

#### PostgreSQL with Prisma

1. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

2. **Update `prisma/schema.prisma`**
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id        String   @id @default(cuid())
     email     String   @unique
     name      String
     password  String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

3. **Create migration**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Update API routes** (example for login):
   ```typescript
   import { PrismaClient } from '@prisma/client'
   import bcrypt from 'bcryptjs'
   import jwt from 'jsonwebtoken'

   const prisma = new PrismaClient()

   export async function POST(request: NextRequest) {
     const { email, password } = await request.json()
     
     const user = await prisma.user.findUnique({
       where: { email }
     })

     if (!user || !await bcrypt.compare(password, user.password)) {
       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
     }

     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!)
     
     return NextResponse.json({
       token,
       user: { id: user.id, name: user.name, email: user.email }
     })
   }
   ```

#### MongoDB with Mongoose

1. **Create user model** (`models/User.ts`):
   ```typescript
   import mongoose, { Document, Schema } from 'mongoose'

   interface IUser extends Document {
     name: string
     email: string
     password: string
   }

   const userSchema = new Schema<IUser>({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true }
   })

   export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)
   ```

2. **Update API routes** with MongoDB:
   ```typescript
   import User from '@/models/User'
   import bcrypt from 'bcryptjs'
   import jwt from 'jsonwebtoken'

   export async function POST(request: NextRequest) {
     const { email, password } = await request.json()
     
     const user = await User.findOne({ email })
     
     if (!user || !await bcrypt.compare(password, user.password)) {
       return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
     }

     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)
     
     return NextResponse.json({
       token,
       user: { id: user._id, name: user.name, email: user.email }
     })
   }
   ```

#### AWS Cloud Databases

For production applications, AWS offers managed database services that provide high availability, automatic backups, and scaling capabilities.

##### AWS RDS (PostgreSQL/MySQL)

AWS RDS provides managed PostgreSQL and MySQL databases with automatic backups, multi-AZ deployments, and read replicas.

1. **Set up AWS RDS**
   - Create an RDS instance in the AWS Console
   - Choose PostgreSQL or MySQL engine
   - Configure security groups to allow connections from your application
   - Note the endpoint, port, username, and password

2. **Install dependencies**
   ```bash
   # For PostgreSQL
   npm install prisma @prisma/client
   npm install bcryptjs jsonwebtoken
   npm install --save-dev @types/bcryptjs @types/jsonwebtoken
   
   # For MySQL with Sequelize
   npm install sequelize mysql2
   npm install bcryptjs jsonwebtoken
   npm install --save-dev @types/bcryptjs @types/jsonwebtoken
   ```

3. **Prisma with AWS RDS PostgreSQL**
   ```prisma
   # prisma/schema.prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id        String   @id @default(cuid())
     email     String   @unique
     name      String
     password  String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

4. **Sequelize with AWS RDS MySQL**
   ```typescript
   // config/database.ts
   import { Sequelize } from 'sequelize'

   const sequelize = new Sequelize({
     dialect: 'mysql',
     host: process.env.DB_HOST,
     port: parseInt(process.env.DB_PORT || '3306'),
     database: process.env.DB_NAME,
     username: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     logging: false, // Set to console.log for debugging
     pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
     }
   })

   export default sequelize
   ```

   ```typescript
   // models/User.ts
   import { DataTypes, Model } from 'sequelize'
   import sequelize from '../config/database'

   interface UserAttributes {
     id: string
     email: string
     name: string
     password: string
   }

   class User extends Model<UserAttributes> implements UserAttributes {
     public id!: string
     public email!: string
     public name!: string
     public password!: string
   }

   User.init({
     id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
       primaryKey: true
     },
     email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
     },
     name: {
       type: DataTypes.STRING,
       allowNull: false
     },
     password: {
       type: DataTypes.STRING,
       allowNull: false
     }
   }, {
     sequelize,
     modelName: 'User',
     tableName: 'users'
   })

   export default User
   ```

##### AWS DocumentDB (MongoDB-compatible)

AWS DocumentDB is a fully managed MongoDB-compatible database service.

1. **Set up AWS DocumentDB**
   - Create a DocumentDB cluster in the AWS Console
   - Configure security groups and VPC settings
   - Create a database user and note connection details

2. **Install dependencies**
   ```bash
   npm install mongoose bcryptjs jsonwebtoken
   npm install --save-dev @types/bcryptjs @types/jsonwebtoken
   ```

3. **Mongoose with AWS DocumentDB**
   ```typescript
   // lib/mongodb.ts
   import mongoose from 'mongoose'

   const MONGODB_URI = process.env.MONGODB_URI!

   if (!MONGODB_URI) {
     throw new Error('Please define the MONGODB_URI environment variable')
   }

   let cached = global.mongoose

   if (!cached) {
     cached = global.mongoose = { conn: null, promise: null }
   }

   async function connectDB() {
     if (cached.conn) {
       return cached.conn
     }

     if (!cached.promise) {
       const opts = {
         bufferCommands: false,
       }

       cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
         return mongoose
       })
     }

     try {
       cached.conn = await cached.promise
     } catch (e) {
       cached.promise = null
       throw e
     }

     return cached.conn
   }

   export default connectDB
   ```

   ```typescript
   // models/User.ts
   import mongoose, { Document, Schema } from 'mongoose'

   interface IUser extends Document {
     name: string
     email: string
     password: string
   }

   const userSchema = new Schema<IUser>({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true }
   })

   export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)
   ```

##### AWS Lambda Considerations

If deploying to AWS Lambda, consider these optimizations:

```typescript
// lib/prisma.ts (for Lambda)
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

```typescript
// lib/mongoose.ts (for Lambda)
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
```

### 4. Environment Variables

Create a `.env.local` file:

**Local Development:**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
# or for MongoDB
MONGODB_URI="mongodb://localhost:27017/dbname"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"
```

**AWS RDS (PostgreSQL):**
```env
# AWS RDS PostgreSQL
DATABASE_URL="postgresql://username:password@your-rds-endpoint.region.rds.amazonaws.com:5432/dbname"

# MySQL Alternative
DB_HOST="your-rds-endpoint.region.rds.amazonaws.com"
DB_PORT="3306"
DB_NAME="your_database_name"
DB_USER="your_username"
DB_PASSWORD="your_password"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"
```

**AWS DocumentDB:**
```env
# AWS DocumentDB (MongoDB-compatible)
MONGODB_URI="mongodb://username:password@your-docdb-cluster.cluster-xyz.region.docdb.amazonaws.com:27017/dbname?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key"
```

**Production Environment Variables:**
```env
# Optional: For production
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-nextauth-secret"

# AWS Specific (if using AWS services)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
```

### 5. Security Improvements

When connecting to a real database, implement these security measures:

- **Password Hashing**: Use bcrypt to hash passwords before storing
- **JWT Tokens**: Implement proper JWT token generation and validation
- **Input Validation**: Add server-side validation with libraries like Zod
- **Rate Limiting**: Implement rate limiting for auth endpoints
- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Store sensitive data in environment variables

### 6. Production Considerations

- **Database Connection Pooling**: Configure proper connection pooling
- **Error Handling**: Implement comprehensive error handling
- **Logging**: Add proper logging for debugging and monitoring
- **Testing**: Write unit and integration tests
- **CI/CD**: Set up automated testing and deployment

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize components in `src/app/components/`

### Authentication
- Extend user model with additional fields
- Add role-based access control
- Implement social authentication (OAuth)
- Add two-factor authentication

### UI Components
- Replace custom icons with your preferred icon library
- Add form validation libraries (React Hook Form, Formik)
- Implement toast notifications for better UX

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Works with Next.js static exports
- **Railway**: Great for full-stack apps with databases
- **DigitalOcean**: For custom server deployments
- **AWS/GCP/Azure**: For enterprise deployments

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy coding!** 🎉 If you find this scaffold helpful, please give it a star ⭐
