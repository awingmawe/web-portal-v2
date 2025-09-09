# API Setup Instructions

## 1. Start Backend API
Pastikan backend service running di port 9000:
```bash
npm start
```

## 2. Generate JWT Token
Generate test token untuk development:
```bash
npm run token:user      # Regular user
npm run token:admin     # Admin user  
npm run token:bdm       # BDM user
```

## 3. Set Token di Browser
Buka browser console (F12) dan jalankan:
```javascript
// Set token di localStorage
localStorage.setItem('authToken', 'YOUR_JWT_TOKEN_HERE')

// Verify token tersimpan
console.log('Token:', localStorage.getItem('authToken'))
```

## 4. Test API Connection
Test manual API call:
```javascript
// Test di browser console
fetch('http://localhost:9000/api/talangan/partners', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log('Partners:', data))
```

## 5. Check API Documentation
Buka Swagger docs:
```
http://localhost:9000/public/banking/api-docs
```

## Common Issues:

### CORS Error
Pastikan backend mengizinkan CORS untuk `http://localhost:3000`

### 401 Unauthorized  
- Token belum di-set atau expired
- Generate token baru dan set ulang

### 404 Not Found
- Backend belum running
- Endpoint URL salah

### Network Error
- Backend offline
- Port 9000 tidak accessible