import React from 'react'
import OwnerLayout from './layouts/OwnerLayout'
import { Route, Routes } from 'react-router-dom'
import { OwnerFileTransactions, OwnerFileUpload, OwnerHomeScreen, OwnerKeyRequest, OwnerMyfiles, OwnerSharefiles } from './screens/Owner'
import { HomeScreen, OwnerScreen, PageNotFound, RecipientScreen } from './screens/Root';
import { Toaster } from 'react-hot-toast';
import RecipientLayout from './layouts/RecipientLayout';
import { RecipientFileView, RecipientHomeScreen, RecipientKeyRequest, RecipientMyFiles } from './screens/Recipient';
import { AdminAllFiles, AdminFileTransaction, AdminHomeScreen, AdminKeyRequest, AdminOwnerList, AdminRecipientList } from './screens/Admin';
import AdminLayout from './layouts/AdminLayout';
import RootLayout from './layouts/RootLayout';
import AdminScreen from './screens/Root/AdminScreen';


const App = () => {
  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route index element={<HomeScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
          <Route path='/owner' element={<OwnerScreen />} />
          <Route path='/recipient' element={<RecipientScreen />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path='/dashboard/' >
          <Route index element={<OwnerHomeScreen />} />
          <Route path="/dashboard/owner/" element={<OwnerLayout />} >
            <Route index element={<OwnerHomeScreen />} />
            <Route path='/dashboard/owner/myfiles' element={<OwnerMyfiles />} />
            <Route path='/dashboard/owner/fileupload' element={<OwnerFileUpload />} />
            <Route path='/dashboard/owner/fileshare' element={<OwnerSharefiles />} />
            <Route path='/dashboard/owner/filetransaction' element={<OwnerFileTransactions />} />
            <Route path='/dashboard/owner/keyreq' element={<OwnerKeyRequest />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/dashboard/recipient/" element={<RecipientLayout />} >
            <Route index element={<RecipientHomeScreen />} />
            <Route path='/dashboard/recipient/myfiles' element={<RecipientMyFiles />} />
            <Route path='/dashboard/recipient/keyreq' element={<RecipientKeyRequest />} />
            <Route path='/dashboard/recipient/fileview' element={<RecipientFileView />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/dashboard/admin/" element={<AdminLayout />} >
            <Route index element={<AdminHomeScreen />} />
            <Route path='/dashboard/admin/allfiles' element={<AdminAllFiles />} />
            <Route path='/dashboard/admin/allowners' element={<AdminOwnerList />} />
            <Route path='/dashboard/admin/allrecipients' element={<AdminRecipientList />} />
            <Route path='/dashboard/admin/alltransactions' element={<AdminFileTransaction/>} />
            <Route path='/dashboard/admin/keyreq' element={<AdminKeyRequest />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App