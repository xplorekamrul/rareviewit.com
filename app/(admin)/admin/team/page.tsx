import { getTeamMembers } from "@/actions/team";
import { TeamPageClient } from "@/components/admin/team/TeamPageClient";

interface TeamMember {
   id: string;
   name: string;
   role: string;
   bio: string;
   image: string;
   imageAlt: string | null;
   createdAt: Date;
   updatedAt: Date;
}

export default async function AdminTeamPage() {
   // Fetch data on server side
   const result = await getTeamMembers();
   const teamMembers: TeamMember[] = (result.success && result.data
      ? (result.data as TeamMember[])
      : []) || [];

   return <TeamPageClient initialTeamMembers={teamMembers} />;
}
