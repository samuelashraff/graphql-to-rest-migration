import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "graphql";
import { graphqlHTTP } from "koa-graphql";
import Router from "koa-router";
import { getAssignments, getCourse, getLectures } from "./courses";
import { createCourse } from "./root"

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
        },
    }),
    mutation: new GraphQLObjectType({
        name: "CreateCourseMutationType",
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
                        return { success: true, message: "Course created successfully" };
                    } catch (error) {
                        console.error("Error creating course:", error);
                        throw new Error("Failed to create course");
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
