'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { User, Lock, Save, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SettingsForm() {
  const { data: session, update } = useSession()

  // Profile section
  const [name, setName] = useState(session?.user?.name ?? '')
  const [profileLoading, setProfileLoading] = useState(false)

  // Password section
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error ?? 'Update failed.')
        return
      }

      await update({ name: data.user.name })
      toast.success('Profile updated.')
    } catch {
      toast.error('Update failed. Please try again.')
    } finally {
      setProfileLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    setPasswordLoading(true)
    setPasswordSuccess(false)

    try {
      const res = await fetch('/api/auth/update-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error ?? 'Password update failed.')
        return
      }

      toast.success('Password updated successfully.')
      setPasswordSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      toast.error('Password update failed. Please try again.')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg" aria-hidden="true">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h2>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="profile-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={session?.user?.email ?? ''}
              disabled
              aria-readonly="true"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 pl-1">Email address cannot be changed.</p>
          </div>

          <button
            type="submit"
            disabled={profileLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {profileLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="w-4 h-4" aria-hidden="true" />
            )}
            Save Changes
          </button>
        </form>
      </section>

      {/* Password */}
      <section className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg" aria-hidden="true">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
        </div>

        {passwordSuccess && (
          <div role="status" className="mb-4 flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <CheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> Password updated successfully.
          </div>
        )}

        <form onSubmit={handlePasswordUpdate} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="current-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="new-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              minLength={8}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="confirm-new-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Repeat new password"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {passwordLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Lock className="w-4 h-4" aria-hidden="true" />
            )}
            Update Password
          </button>
        </form>
      </section>
    </div>
  )
}
