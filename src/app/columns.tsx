"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Edit from "@/components/Edit";
import { handleDelete } from "@/functions/handleDelete";
import { handleSend } from "@/functions/handleSend";
import { DisplayInfo } from "@/middleware/displayStore";

export const arrayCheckbox: DisplayInfo[] = [];

export const columns: ColumnDef<DisplayInfo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          if (!value) {
            for (let i = arrayCheckbox.length; i > 0; i--) {
              arrayCheckbox.pop();
            }
          } else {
            for (let i = arrayCheckbox.length; i > 0; i--) {
              arrayCheckbox.pop();
            }
            table.options.data.map((e) => {
              arrayCheckbox.push(e);
            });
            console.log(arrayCheckbox);
          }
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          const index = arrayCheckbox.indexOf(row.original);

          if (value) {
            arrayCheckbox.push(row.original);
          } else {
            arrayCheckbox.splice(index, 1);
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    header: "Status",
    accessorKey: "Status",
    cell: ({ row }) => {
      return (
        <p>{row.original.isActive ? "🟢 Connected" : "🔴 Disconnected"}</p>
      );
    },
  },
  {
    // id: "displayName",
    accessorKey: "displayName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Display Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Dialog>
              <DropdownMenu>
                <DropdownMenuItem>
                  <DialogTrigger className="w-full text-start">
                    Edit
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenu>

              <DialogContent>
                <Edit data={row.original} />
              </DialogContent>
            </Dialog>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleSend(row.original.userId, row.original.displayId);
              }}
            >
              Send
            </DropdownMenuItem>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuItem>
                  <DialogTrigger className="w-full text-start">
                    Delete
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenu>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Do you want to delete the entry? Deleting this entry cannot
                    be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      handleDelete(row.original.id, row.original.userId);
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
