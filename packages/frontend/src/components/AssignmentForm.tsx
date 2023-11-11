import React, { useState } from "react";

import { Button } from "./ui/button";

import { Card, CardContent } from "./ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BASE_URL } from "@/config";

export const AssignmentForm = ({
    setShowAssignmentForm,
    courseId,
}: {
    setShowAssignmentForm: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
}) => {
    const [formData, setFormData] = useState({
        type: "",
        deadline: "",
        is_group: false,
        is_obligatory: false,
    });

    const handleCreateFormInputChange = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        const { name, value, checked, type } = e.currentTarget;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async () => {
        try {
            fetch(`${BASE_URL}/courses/${courseId}/assignments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(() => setShowAssignmentForm(false));
        } catch (e) {
            console.error("Error: " + e);
        }
    };
    return (
        <Card
            className="pt-6 pb-6 flex 
        flex-col rounded 
        shadow-lg"
        >
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="type">Assignment type</Label>
                        <Input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleCreateFormInputChange}
                            placeholder="Assignment type"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="type">Deadline</Label>
                        <Input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleCreateFormInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4 flex flex-row gap-6 justify-center">
                        <div>
                            <Label htmlFor="is_obligatory">Obligatory</Label>
                            <Input
                                type="checkbox"
                                name="is_obligatory"
                                checked={formData.is_obligatory}
                                onChange={handleCreateFormInputChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="is_group">Groupwork</Label>
                            <Input
                                type="checkbox"
                                name="is_group"
                                checked={formData.is_group}
                                onChange={handleCreateFormInputChange}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="mb-4 w-full">
                        Create Assignment
                    </Button>
                    <Button
                        type="button"
                        className="mb-4 w-full"
                        onClick={() => setShowAssignmentForm(false)}
                    >
                        Cancel
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
