import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLUnionType,
} from "graphql";
import { graphqlHTTP } from "koa-graphql";
import Router from "koa-router";
import {
    getAssignments,
    getCourse,
    getCourses,
    getLectures,
    createCourse,
    deleteCourseById,
} from "./courses";
import { getUpcomingEvents } from "./timetable";
import { deleteAssignmentById } from "./assignments";
import { deleteLectureById } from "./lectures";

export const gqlRouter = new Router();

const CourseType = new GraphQLObjectType({
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

const AssignmentType = new GraphQLObjectType({
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

const LectureType = new GraphQLObjectType({
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

const UpcomingEvent = new GraphQLUnionType({
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

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            course: {
                type: CourseType,
                args: {
                    id: { type: GraphQLInt },
                },
                resolve: async (_, args) => {
                    try {
                        return await getCourse(args.id);
                    } catch (error) {
                        console.error(
                            "Error while querying the course:",
                            error,
                        );
                        throw new Error("Internal Server Error");
                    }
                },
            },
            courses: {
                type: new GraphQLList(CourseType),
                resolve: async () => {
                    try {
                        return await getCourses();
                    } catch (error) {
                        console.error("Error while querying courses:", error);
                        throw new Error("Internal Server Error");
                    }
                },
            },
            upcomingEvents: {
                type: new GraphQLList(UpcomingEvent),
                resolve: async () => {
                    try {
                        return await getUpcomingEvents();
                    } catch (error) {
                        console.error(
                            "Error while querying upcoming events:",
                            error,
                        );
                        throw new Error("Internal Server Error");
                    }
                },
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: "RootMutationType",
        fields: {
            createCourse: {
                type: CourseType,
                args: {
                    name: { type: GraphQLString },
                    status: { type: GraphQLString },
                    startDate: { type: GraphQLString },
                    endDate: { type: GraphQLString },
                },
                resolve: async (_, args) => {
                    try {
                        await createCourse(args);
                        return {
                            success: true,
                            message: "Course created successfully",
                        };
                    } catch (error) {
                        console.error("Error creating course:", error);
                        throw new Error("Failed to create course");
                    }
                },
            },
            deleteCourse: {
                type: GraphQLBoolean,
                args: {
                    id: { type: GraphQLInt },
                },
                resolve: async (_, args) => {
                    try {
                        await deleteCourseById(args.id);
                        return true;
                    } catch (error) {
                        console.error("Error deleting course:", error);
                        throw new Error("Failed to delete course");
                    }
                },
            },
            deleteLecture: {
                type: GraphQLBoolean,
                args: {
                    id: { type: GraphQLInt },
                },
                resolve: async (_, args) => {
                    try {
                        await deleteLectureById(args.id);
                        return true;
                    } catch (error) {
                        console.error("Error deleting course:", error);
                        throw new Error("Failed to delete course");
                    }
                },
            },
            deleteAssignment: {
                type: GraphQLBoolean,
                args: {
                    id: { type: GraphQLInt },
                },
                resolve: async (_, args) => {
                    try {
                        await deleteAssignmentById(args.id);
                        return true;
                    } catch (error) {
                        console.error("Error deleting assignment:", error);
                        throw new Error("Failed to delete assignment");
                    }
                },
            },
        },
    }),
});

gqlRouter.all(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);
