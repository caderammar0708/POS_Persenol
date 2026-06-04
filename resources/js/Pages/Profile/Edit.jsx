import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('gd-theme');
        const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const enabled = savedTheme ? savedTheme === 'dark' : preferredDark;

        setDarkMode(enabled);
        document.documentElement.classList.toggle('dark', enabled);
    }, []);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle('dark', next);
        document.documentElement.style.colorScheme = next ? 'dark' : 'light';
        localStorage.setItem('gd-theme', next ? 'dark' : 'light');
    };
    return (
        <AuthenticatedLayout
            user={auth?.user ?? null}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-slate-900 dark:text-slate-100">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100">Appearance</h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Toggle dark mode for the whole app.</p>
                            </header>
                            <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-800/80">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Dark Mode</p>
                                    <p className="text-xs text-gray-500 dark:text-slate-300">Applies across all authenticated pages.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleTheme}
                                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                                >
                                    {darkMode ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
                                    {darkMode ? 'Dark On' : 'Dark Off'}
                                </button>
                            </div>
                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-slate-900 dark:text-slate-100">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-slate-900 dark:text-slate-100">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg dark:bg-slate-900 dark:text-slate-100">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
