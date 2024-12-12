"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Search } from "lucide-react";
import GroupList from "./GroupList";
import GroupSettings from "./GroupSettings";
import CreateGroupDialog from "./CreateGroupDialog";
import InviteLinkGenerator from "./InviteLinkGenerator";

export default function GroupsPage({ uid, groups }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-10 w-full">
      <Tabs defaultValue="groups" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="settings">Group Settings</TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Paid Group
          </Button>
        </div>
        <div>
          <TabsContent value="groups" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Your Paid Groups</CardTitle>
                <CardDescription>
                  Manage and interact with your paid groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Search className="w-4 h-4 opacity-50" />
                  <Input placeholder="Search groups..." className="flex-1" />
                </div>
                <ScrollArea className="h-[600px]">
                  <GroupList onSelectGroup={setSelectedGroup} data={groups} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            <GroupSettings group={selectedGroup} />
            {selectedGroup && <InviteLinkGenerator group={selectedGroup} />}
          </TabsContent>
        </div>
      </Tabs>
      <CreateGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}