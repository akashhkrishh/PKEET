import React from 'react'
import { AdminLayout, OwnerLayout, RootLayout } from './layouts'
import { Route, Routes } from 'react-router-dom';
import { Dashboard, PageNotFoundScreen } from './screens/others'
import { AdminScreen, HomeScreen, OwnerScreen, RecipientScreen } from './screens/Root';
import { AdminAllOwnerList, AdminAllRecipientList, AdminHomeScreen, AdminUploadedFiles } from './screens/Admin';
import { OwnerFileShare, OwnerFileTransaction, OwnerFileUpload, OwnerHome, OwnerMyFiles } from './screens/Owner';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/owner" element={<OwnerScreen />} />
          <Route path="/recipient" element={<RecipientScreen />} />
          <Route path="*" element={<PageNotFoundScreen/>} />
        </Route>

        <Route path='/dashboard/' >
            <Route index element={<Dashboard/>} />
            <Route path="/dashboard/admin/" element={<AdminLayout />} >
              <Route index element={<AdminHomeScreen />} />
              <Route path='/dashboard/admin/allownerlist' element={<AdminAllOwnerList />} />
              <Route path='/dashboard/admin/allrecipientlist' element={<AdminAllRecipientList />} />
              <Route path='/dashboard/admin/uploadfileslist' element={<AdminUploadedFiles/>} />
              <Route path="*" element={<PageNotFoundScreen/>} />
            </Route>
            <Route path="/dashboard/owner/" element={<OwnerLayout />} >
              <Route index element={<OwnerHome />} />
              <Route path='/dashboard/owner/myfiles' element={<OwnerMyFiles />} />
              <Route path='/dashboard/owner/fileupload' element={<OwnerFileUpload />} />
              <Route path='/dashboard/owner/fileshare' element={<OwnerFileShare/>} />
              <Route path='/dashboard/owner/filetransaction' element={<OwnerFileTransaction/>} />
              <Route path="*" element={<PageNotFoundScreen/>} />
            </Route>
            <Route path="*" element={<PageNotFoundScreen/>} />
          </Route>
      </Routes>
    </div>
  )
}

export default App