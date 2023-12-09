import React, { useState } from "react";

import { Button } from "./ui/button";

import { Card, CardContent } from "./ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRevalidator } from "react-router-dom";
import { makeGraphQLQuery } from "@/main";

export const LectureForm = ({
    setShowLectureForm,
    courseId,
}: {
    setShowLectureForm: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
}) => {
    const revalidator = useRevalidator();

    const [formData, setFormData] = useState({
        location: "",
        date: "",
        start_time: "",
        end_time: "",
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const graphqlMutation = `mutation {
            createLecture(
                courseId: ${courseId}
                date: "${formData.date}"
                start_time: "${formData.start_time}"
                end_time: "${formData.end_time}"
                is_obligatory: ${formData.is_obligatory}
                location: "${formData.location}"
            ) {
                success
            }
        }`;
        try {
            makeGraphQLQuery(graphqlMutation).then(() => {
                setShowLectureForm(false);
                revalidator.revalidate();
            });
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
                        <Label htmlFor="type">Date</Label>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleCreateFormInputChange}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-row gap-6 justify-between">
                        <div>
                            <Label htmlFor="start_time">Start time</Label>
                            <Input
                                type="time"
                                name="start_time"
                                value={formData.start_time}
                                onChange={handleCreateFormInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="end_time">End time</Label>
                            <Input
                                type="time"
                                name="end_time"
                                value={formData.end_time}
                                onChange={handleCreateFormInputChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="is_obligatory">Obligatory</Label>
                            <Input
                                type="checkbox"
                                name="is_obligatory"
                                checked={formData.is_obligatory}
                                onChange={handleCreateFormInputChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleCreateFormInputChange}
                            placeholder="Location"
                            required
                        />
                    </div>

                    <Button type="submit" className="mb-4 w-full">
                        Create Lecture
                    </Button>
                    <Button
                        type="button"
                        className="mb-4 w-full"
                        onClick={() => setShowLectureForm(false)}
                    >
                        Cancel
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
