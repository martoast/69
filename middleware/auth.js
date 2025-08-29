export default defineNuxtRouteMiddleware((to, from) => {
    // Skip middleware on server side
    if (process.server) return
  
    // Check if user is authenticated
    const authData = localStorage.getItem('userAuth')
    
    if (!authData) {
      // No auth data - redirect to login
      return navigateTo('/login')
    }
  
    try {
      const parsedAuth = JSON.parse(authData)
      
      // Check if authentication is valid
      if (!parsedAuth.isAuthenticated || !parsedAuth.username) {
        // Invalid auth data - clear and redirect
        localStorage.removeItem('userAuth')
        return navigateTo('/login')
      }
  
      // Check if login is expired (optional - 24 hours)
      const loginTime = new Date(parsedAuth.loginTime)
      const now = new Date()
      const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60)
      
      if (hoursSinceLogin > 24) {
        // Login expired - clear and redirect
        localStorage.removeItem('userAuth')
        return navigateTo('/login')
      }
  
      // Authentication valid - allow access
      return
      
    } catch (error) {
      // Invalid JSON - clear and redirect
      localStorage.removeItem('userAuth')
      return navigateTo('/login')
    }
  })