<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h2>Login to Your Account</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <i class="fas fa-envelope icon"></i>
          <input
            type="email"
            v-model="email"
            placeholder="Enter email"
            required
            aria-label="Email address"
          />
        </div>
        <div class="form-group">
          <i class="fas fa-lock icon"></i>
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" class="login-button" aria-label="Login">
          Login
        </button>
      </form>
    </div>

    <!-- Notification -->
    <transition name="fade">
      <div
        v-show="showNotification"
        :class="['notification', notificationType]"
      >
        <i :class="notificationIcon"></i>
        {{ notificationMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { login } from '@/services/api.js';  // Correct if api.js is in src/services folder

export default {
  data() {
    return {
      email: '',
      password: '',
      showNotification: false,
      notificationMessage: '',
      notificationType: '', // 'success' or 'error'
      notificationIcon: '', // Icon class (e.g., 'fas fa-check' or 'fas fa-times')
    };
  },
  methods: {
    async handleLogin() {
      try {
        const data = await login(this.email, this.password);
        console.log('Login successful:', data);
        
        // Hiển thị thông báo thành công
        this.notificationMessage = 'Login successful!';
        this.notificationType = 'success';
        this.notificationIcon = 'fas fa-check'; // Icon cho thông báo thành công
        this.showNotification = true;

        // Reset form fields
        this.email = '';
        this.password = '';
        
        // Bạn có thể thực hiện các hành động khác như redirect ở đây
      } catch (error) {
        console.error('Login failed:', error);

        // Hiển thị thông báo lỗi
        this.notificationMessage = 'Invalid credentials or server error';
        this.notificationType = 'error';
        this.notificationIcon = 'fas fa-times'; // Icon cho thông báo lỗi
        this.showNotification = true;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.login-box {
  width: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.logo {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}

h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333333;
}

.form-group {
  position: relative;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
}

input::placeholder {
  color: #adb5bd;
}

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #adb5bd;
}

.login-button {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  background: #212529;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #343a40;
}

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fade-in 0.5s ease-out, fade-out 0.5s 2.5s ease-out forwards;
  z-index: 1000;
}

.notification.success {
  background: linear-gradient(45deg, #28a745, #34ce57);
}

.notification.error {
  background: linear-gradient(45deg, #dc3545, #ff5b5b);
}

.notification i {
  margin-right: 10px;
  font-size: 16px;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Keyframes for notification */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
}
</style>
