# 🛒 E-Commerce Full Stack Project
🚀 Features
✅ User Signup & Login (JWT Auth)
✅ Profile with Image, Name, Email
✅ Add Products (with Image upload to Cloudinary)
✅ Product Listing for logged-in user
✅ Email notifications (Order confirmation, etc.)
✅ Responsive UI for all devices

A full-stack e-commerce application built with:
- **Frontend**: React + Tailwind CSS
- **Backend**: Spring Boot + MySQL + Maven
- **File Storage**: Cloudinary
- **Email Service**: JavaMail (SMTP)
- **Authentication**: JWT Token

---

## 📂 Folder Structure

e-commerce/
│
├── backend/ # Spring Boot application
│ ├── src/main/java/ # Java source files
│ │ ├── com.example.app/ # Controllers, Services, Models, Repositories
│ │ ├── config/ # JWT, Security, Cloudinary configs
│ │ ├── controller/ # REST APIs
│ │ ├── model/ # Entity classes (User, Product, etc.)
│ │ ├── repository/ # Spring Data JPA Repos
│ │ ├── service/ # Business logic
│ ├── src/main/resources/
│ │ ├── application.properties # DB, Cloudinary, Email configs
│ └── pom.xml # Maven dependencies
│
├── frontend/ # React application
│ ├── public/ # Static assets
│ ├── src/ # Components, Pages, Store
│ │ ├── components/ # UI components
│ │ ├── pages/ # Login, Signup, Profile, etc.
│ │ ├── store/ # Zustand state management
│ │ ├── assets/ # Images, icons
│ │ ├── App.js # Main App
│ ├── package.json # Frontend dependencies
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rajesh351/e_commerc_full_stack_app.git
cd e-commerce

mvn install

Configure application.properties

# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
spring.datasource.username=root
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

# Cloudinary
cloudinary.cloud_name=your_cloud_name
cloudinary.api_key=your_api_key
cloudinary.api_secret=your_api_secret

# Email SMTP
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_email_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# JWT Secret
jwt.secret=your_secret_key


3️⃣ Frontend Setup (React + Tailwind CSS)

cd e-commerce_react
npm install

Run

npm start

