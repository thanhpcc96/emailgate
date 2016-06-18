import { Route, IndexRoute } from 'react-router';
import React from 'react';

// containers
import App from './container/App';
import Terms from './components/Terms';
import RegisterContainer from './container/RegisterContainer';
import LoginContainer from './container/LoginContainer';
import NewAccountContainer from './container/NewAccountContainer';
import EditAccountContainer from './container/EditAccountContainer';
import NewCompilationContainer from './container/NewCompilationContainer';
import CompilationContainer from './container/CompilationContainer';
import CartContainer from './container/CartContainer';
import CheckoutContainer from './container/CheckoutContainer';
import CheckoutConfirmContainer from './container/CheckoutConfirmContainer';
import NewAddressContainer from './container/NewAddressContainer';
import EditAddressContainer from './container/EditAddressContainer';
import CompilationBuildContainer from './container/CompilationBuildContainer';
import CompilationEmailsContainer from './container/CompilationEmailsContainer';
import AddCompilationEmailsContainer from './container/AddCompilationEmailsContainer';
import ViewCompilationEmailContainer from './container/ViewCompilationEmailContainer';
import EditCompilationEmailContainer from './container/EditCompilationEmailContainer';
import PreviewCompilationEmailContainer from './container/PreviewCompilationEmailContainer';
import CompilationPagesContainer from './container/CompilationPagesContainer';
import ViewCompilationPageContainer from './container/ViewCompilationPageContainer';
import EditCompilationPageContainer from './container/EditCompilationPageContainer';
import PreviewCompilationPageContainer from './container/PreviewCompilationPageContainer';
import CompilationPreviewContainer from './container/CompilationPreviewContainer';
import ViewOrderContainer from './container/ViewOrderContainer';
import CompilationCheckoutContainer from './container/CompilationCheckoutContainer';
import AdminContainer from './container/AdminContainer';
import AdminDashboardContainer from './container/AdminDashboardContainer';

// components
import Home from './components/Home';
import DashboardContainer from './container/DashboardContainer';
import AccountContainer from './container/AccountContainer';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/terms" component={Terms} />
    <Route path="/register" component={RegisterContainer} />
    <Route path="/login" component={LoginContainer} />
    <Route path="/account" component={AccountContainer} />
    <Route path="/dashboard" component={DashboardContainer} />
    <Route path="/cart" component={CartContainer} />
    <Route path="/checkout" component={CheckoutContainer} />
    <Route path="/checkout/confirm" component={CheckoutConfirmContainer} />
    <Route path="/orders/:id" component={ViewOrderContainer} />
    <Route path="/addresses/new" component={NewAddressContainer} />
    <Route path="/addresses/:id/edit" component={EditAddressContainer} />
    <Route path="/accounts/new" component={NewAccountContainer} />
    <Route path="/accounts/:id/edit" component={EditAccountContainer} />
    <Route path="/compilations/new" component={NewCompilationContainer} />

    <Route component={CompilationContainer}>
      <Route path="/compilations/:compilationId/build" component={CompilationBuildContainer} />
      <Route path="/compilations/:compilationId/add-emails" component={AddCompilationEmailsContainer} />
      <Route component={CompilationEmailsContainer}>
        <Route path="/compilations/:compilationId/build/emails/:emailId" component={ViewCompilationEmailContainer} />
        <Route path="/compilations/:compilationId/build/emails/:emailId/edit" component={EditCompilationEmailContainer} />
        <Route path="/compilations/:compilationId/build/emails/:emailId/preview" component={PreviewCompilationEmailContainer} />
      </Route>
      <Route component={CompilationPagesContainer}>
        <Route path="/compilations/:compilationId/build/pages/:pageId" component={ViewCompilationPageContainer} />
        <Route path="/compilations/:compilationId/build/pages/:pageId/edit" component={EditCompilationPageContainer} />
        <Route path="/compilations/:compilationId/build/pages/:pageId/preview" component={PreviewCompilationPageContainer} />
      </Route>
      <Route path="/compilations/:compilationId/preview" component={CompilationPreviewContainer} />
      <Route path="/compilations/:compilationId/checkout" component={CompilationCheckoutContainer} />
    </Route>

    <Route component={AdminContainer}>
      <Route path="/admin/dashboard" component={AdminDashboardContainer} />
    </Route>
  </Route>
);

export default routes;
