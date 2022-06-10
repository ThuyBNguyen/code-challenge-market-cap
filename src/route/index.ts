/**
 * This file is used for rendering appropriate layout for each role
 * and declaring permission for every route with each role
 */
export default {
  // applicant will be changed. It depends on roles of system
  applicant: ['/profile'],
  anonymousRoute: ['/', '/verify-email', '/terms', '/privacy'],
  route: ['/invitation', '/forgotPassword', '/404'],
  notAllowLoggeduser: ['/login'],
};
