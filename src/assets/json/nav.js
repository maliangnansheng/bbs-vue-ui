export default {
    menu: [
        {
            name: "dashboard",
            path: "/dashboard"
        },
        {
            name: "organization",
            path: "/organization"
        },
        {
            name: "projectManage",
            path: "/projectManage"
        },
        {
            name: "rightsRole",
            path: "/rightsRole",
            children: [
                {name: "rights", path: "/rightsRole/rights"},
                {name: "role", path: "/rightsRole/role"}
            ]
        },
        {
            name: "user",
            path: "/user"
        },
        {
            name: "feedbacks",
            path: "/feedbacks"
        },
        {
            name: "visitRecord",
            path: "/visitRecord"
        }
    ]
}