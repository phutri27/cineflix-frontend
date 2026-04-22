import { ErrorMessages } from "@/utils/error-messages"
import { Award, CreditCard, User, Mail } from "lucide-react"
import { useProfile, useUserStore } from "@/hooks"

export default function GeneralInfo() {
    const { id, first_name, last_name, email } = useUserStore.useUserRoleStore()
    const { data: profile, isLoading, isError, error } = useProfile.useGetProfile(id!)

    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center h-full min-h-[400px]">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-neutral-400 font-medium">Loading profile...</p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="p-8">
                <ErrorMessages error={error}/>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 animate-fade-in">
            <div className="mb-8 border-b border-neutral-800 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    General Information
                </h1>
            </div>
            <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-6 mb-8 flex flex-col gap-2">
                <p className="text-xl text-white font-bold">
                    Welcome back, <span className="text-red-500">{`${first_name} ${last_name}`}</span>!
                </p>
                <p className="text-neutral-400 text-sm md:text-base">
                    This page allows you to view and manage your Cineflix account information.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-neutral-800/30 border border-neutral-700/50 rounded-xl p-6 flex items-center gap-4 hover:border-neutral-600 transition-colors">
                    <div className="h-12 w-12 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 shrink-0">
                        <Award className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Member's Rank</p>
                        <p className="text-lg font-bold text-white capitalize">{profile?.member_rank || "Standard"}</p>
                    </div>
                </div>
                <div className="bg-neutral-800/30 border border-neutral-700/50 rounded-xl p-6 flex items-center gap-4 hover:border-neutral-600 transition-colors">
                    <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shrink-0">
                        <CreditCard className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">Total Spending</p>
                        <p className="text-lg font-bold text-white">
                            {profile?.spending_total ? profile.spending_total.toLocaleString('en-US') : "0"} <span className="text-sm text-neutral-400 font-medium">VND</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-800/30 border border-neutral-700/50 rounded-xl overflow-hidden">
                <div className="bg-neutral-800/50 px-6 py-4 border-b border-neutral-700/50">
                    <h3 className="text-lg font-bold text-white">Personal Details</h3>
                </div>
                <div className="flex flex-col">
                    <div className="px-6 py-4 border-b border-neutral-800/50 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:bg-neutral-800/20 transition-colors">
                        <div className="flex items-center gap-2 sm:w-48 text-neutral-400">
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">First Name</span>
                        </div>
                        <p className="text-white font-medium">{first_name}</p>
                    </div>
                    <div className="px-6 py-4 border-b border-neutral-800/50 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:bg-neutral-800/20 transition-colors">
                        <div className="flex items-center gap-2 sm:w-48 text-neutral-400">
                            <User className="w-4 h-4" />
                            <span className="text-sm font-medium">Last Name</span>
                        </div>
                        <p className="text-white font-medium">{last_name}</p>
                    </div>
                    <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:bg-neutral-800/20 transition-colors">
                        <div className="flex items-center gap-2 sm:w-48 text-neutral-400">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm font-medium">Email Address</span>
                        </div>
                        <p className="text-white font-medium">{email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}