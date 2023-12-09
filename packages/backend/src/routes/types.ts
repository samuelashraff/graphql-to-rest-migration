import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLUnionType,
} from "graphql";
import { getAssignments, getLectures } from "./resolvers";

export const ResponseType = new GraphQLObjectType({
    name: "ResponseType",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
    }),
});

export const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        credits: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
        // TODO: convert status to enum
        status: { type: GraphQLString },
        notes: { type: GraphQLString },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        responsible_teacher: { type: GraphQLString },
        location: { type: GraphQLString },
        course_link: { type: GraphQLString },
        assignments: {
            type: new GraphQLList(AssignmentType),
            resolve: async (parent) => {
                try {
                    return await getAssignments(parent.id);
                } catch (error) {
                    console.error("Error while querying assignments:", error);
                    throw new Error("Internal Server Error");
                }
            },
        },
        lectures: {
            type: new GraphQLList(LectureType),
            resolve: async (parent) => {
                try {
                    return await getLectures(parent.id);
                } catch (error) {
                    console.error("Error while querying lectures:", error);
                    throw new Error("Internal Server Error");
                }
            },
        },
    }),
});

export const AssignmentType = new GraphQLObjectType({
    name: "AssignmentType",
    fields: {
        id: { type: GraphQLInt },
        // TODO: convert type to enum
        type: { type: GraphQLString },
        // TODO: should be date?
        deadline: { type: GraphQLString },
        is_obligatory: { type: GraphQLBoolean },
        is_group: { type: GraphQLBoolean },
    },
});

export const LectureType = new GraphQLObjectType({
    name: "LectureType",
    fields: {
        id: { type: GraphQLInt },
        // TODO: should be date?
        date: { type: GraphQLString },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        location: { type: GraphQLString },
        is_obligatory: { type: GraphQLBoolean },
    },
});

export const UpcomingEvent = new GraphQLUnionType({
    name: "UpcomingEventType",
    types: [AssignmentType, LectureType],
    resolveType(value) {
        if (value.deadline) {
            return AssignmentType;
        } else if (value.date) {
            return LectureType;
        }
        // If the type cannot be determined, you can return null or throw an error.
        return null;
    },
});
