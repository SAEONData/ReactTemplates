import { createUserManager } from 'redux-oidc';
import { ssoBaseURL } from '../../config/ssoBaseURL'

const userManagerConfig = {
    client_id: 'NCCRD_React_Client',
    client_secret: '5FB072EFC225',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/callback#`,
    // post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#/logout`,
    //silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    //response_mode: 'form_post',
    response_type: 'id_token token',
    scope: 'openid profile email SAEON.NCCRD.Web.API',
    authority: ssoBaseURL,
    automaticSilentRenew: false,
    filterProtocolClaims: true,
    loadUserInfo: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
