"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_1 = require("fs");
var docx_1 = require("docx");
var mock = {
    "maxResults": 50,
    "startAt": 0,
    "total": 2,
    "isLast": true,
    "values": [
        {
            "id": 1,
            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/agile/1.0/sprint/1",
            "state": "closed",
            "name": "UN Sprint 1",
            "startDate": "2024-04-02T03:00:53.736Z",
            "endDate": "2024-04-09T03:00:00.000Z",
            "completeDate": "2024-04-10T00:02:13.379Z",
            "createdDate": "2024-04-09T23:37:05.051Z",
            "originBoardId": 3,
            "goal": "Essa sprint espero conseguir fazer as coisas, obrigado por tudo :D"
        },
        {
            "id": 2,
            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/agile/1.0/sprint/2",
            "state": "future",
            "name": "UN Sprint 2",
            "startDate": "2024-04-09T03:00:53.736Z",
            "endDate": "2024-04-16T03:00:00.000Z",
            "createdDate": "2024-04-10T00:02:13.433Z",
            "originBoardId": 3
        }
    ]
};
var mock1 = {
    "expand": "schema,names",
    "startAt": 0,
    "maxResults": 50,
    "total": 2,
    "issues": [
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "10013",
            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/agile/1.0/issue/10013",
            "key": "UN-3",
            "fields": {
                "statuscategorychangedate": "2024-04-09T21:02:04.608-0300",
                "issuetype": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issuetype/10010",
                    "id": "10010",
                    "description": "Stories track functionality or features expressed as user goals.",
                    "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium",
                    "name": "Story",
                    "subtask": false,
                    "avatarId": 10315,
                    "entityId": "4a244c1c-de05-4c80-a842-1f87eff4c1ed",
                    "hierarchyLevel": 0
                },
                "parent": {
                    "id": "10018",
                    "key": "UN-8",
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/10018",
                    "fields": {
                        "summary": "Claim",
                        "status": {
                            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/status/10010",
                            "description": "",
                            "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/",
                            "name": "To Do",
                            "id": "10010",
                            "statusCategory": {
                                "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/statuscategory/2",
                                "id": 2,
                                "key": "new",
                                "colorName": "blue-gray",
                                "name": "To Do"
                            }
                        },
                        "priority": {
                            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/priority/3",
                            "iconUrl": "https://manoel-martins.atlassian.net/images/icons/priorities/medium.svg",
                            "name": "Medium",
                            "id": "3"
                        },
                        "issuetype": {
                            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issuetype/10013",
                            "id": "10013",
                            "description": "Epics track collections of related bugs, stories, and tasks.",
                            "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
                            "name": "Epic",
                            "subtask": false,
                            "avatarId": 10307,
                            "entityId": "9c5137e4-e5a2-4c27-a76e-d0bfa4c1f0f7",
                            "hierarchyLevel": 1
                        }
                    }
                },
                "timespent": null,
                "sprint": null,
                "customfield_10030": null,
                "project": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/project/10002",
                    "id": "10002",
                    "key": "UN",
                    "name": "Undefined",
                    "projectTypeKey": "software",
                    "simplified": true,
                    "avatarUrls": {
                        "48x48": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422",
                        "24x24": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=small",
                        "16x16": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=xsmall",
                        "32x32": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=medium"
                    }
                },
                "customfield_10031": null,
                "customfield_10032": [],
                "customfield_10033": null,
                "fixVersions": [],
                "aggregatetimespent": null,
                "customfield_10034": null,
                "resolution": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/resolution/10000",
                    "id": "10000",
                    "description": "Work has been completed on this issue.",
                    "name": "Done"
                },
                "customfield_10036": null,
                "customfield_10037": null,
                "customfield_10027": null,
                "customfield_10028": null,
                "customfield_10029": null,
                "resolutiondate": "2024-04-09T21:02:04.602-0300",
                "workratio": -1,
                "watches": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/UN-3/watchers",
                    "watchCount": 1,
                    "isWatching": true
                },
                "lastViewed": "2024-04-10T00:32:06.714-0300",
                "issuerestriction": {
                    "issuerestrictions": {},
                    "shouldDisplay": true
                },
                "created": "2024-04-09T21:00:06.224-0300",
                "customfield_10020": [
                    {
                        "id": 1,
                        "name": "UN Sprint 1",
                        "state": "closed",
                        "boardId": 3,
                        "goal": "Essa sprint espero conseguir fazer as coisas, obrigado por tudo :D",
                        "startDate": "2024-04-02T03:00:53.736Z",
                        "endDate": "2024-04-09T03:00:00.000Z",
                        "completeDate": "2024-04-10T00:02:13.379Z"
                    }
                ],
                "customfield_10021": null,
                "epic": null,
                "customfield_10022": null,
                "customfield_10023": null,
                "priority": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/priority/3",
                    "iconUrl": "https://manoel-martins.atlassian.net/images/icons/priorities/medium.svg",
                    "name": "Medium",
                    "id": "3"
                },
                "customfield_10024": null,
                "customfield_10025": "10010_*:*_1_*:*_118431_*|*_10012_*:*_1_*:*_0",
                "customfield_10026": null,
                "labels": [
                    "Configuração"
                ],
                "customfield_10016": null,
                "customfield_10017": null,
                "customfield_10018": {
                    "hasEpicLinkFieldDependency": false,
                    "showField": false,
                    "nonEditableReason": {
                        "reason": "PLUGIN_LICENSE_ERROR",
                        "message": "The Parent Link is only available to Jira Premium users."
                    }
                },
                "customfield_10019": "0|i0001f:",
                "aggregatetimeoriginalestimate": null,
                "timeestimate": null,
                "versions": [],
                "issuelinks": [],
                "assignee": null,
                "updated": "2024-04-10T00:30:25.616-0300",
                "status": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/status/10012",
                    "description": "",
                    "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/",
                    "name": "Done",
                    "id": "10012",
                    "statusCategory": {
                        "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/statuscategory/3",
                        "id": 3,
                        "key": "done",
                        "colorName": "green",
                        "name": "Done"
                    }
                },
                "components": [],
                "timeoriginalestimate": null,
                "description": null,
                "customfield_10010": null,
                "customfield_10014": null,
                "customfield_10015": null,
                "timetracking": {},
                "customfield_10005": null,
                "customfield_10006": null,
                "security": null,
                "customfield_10007": null,
                "customfield_10008": null,
                "customfield_10009": null,
                "aggregatetimeestimate": null,
                "attachment": [],
                "flagged": false,
                "summary": "Portabilidade",
                "creator": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/user?accountId=5dbe13d06acc0b0c2f11a2ff",
                    "accountId": "5dbe13d06acc0b0c2f11a2ff",
                    "emailAddress": "mano.martins29@gmail.com",
                    "avatarUrls": {
                        "48x48": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "24x24": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "16x16": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "32x32": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png"
                    },
                    "displayName": "manoel martins",
                    "active": true,
                    "timeZone": "America/Sao_Paulo",
                    "accountType": "atlassian"
                },
                "subtasks": [],
                "customfield_10040": null,
                "customfield_10041": null,
                "customfield_10042": [],
                "reporter": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/user?accountId=5dbe13d06acc0b0c2f11a2ff",
                    "accountId": "5dbe13d06acc0b0c2f11a2ff",
                    "emailAddress": "mano.martins29@gmail.com",
                    "avatarUrls": {
                        "48x48": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "24x24": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "16x16": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "32x32": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png"
                    },
                    "displayName": "manoel martins",
                    "active": true,
                    "timeZone": "America/Sao_Paulo",
                    "accountType": "atlassian"
                },
                "customfield_10044": null,
                "aggregateprogress": {
                    "progress": 0,
                    "total": 0
                },
                "customfield_10045": null,
                "customfield_10001": null,
                "customfield_10046": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/customFieldOption/10021",
                    "value": "MUSTANG",
                    "id": "10021"
                },
                "customfield_10002": null,
                "customfield_10047": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/customFieldOption/10022",
                    "value": "Conta Digital",
                    "id": "10022"
                },
                "customfield_10003": null,
                "customfield_10004": null,
                "customfield_10038": null,
                "environment": null,
                "duedate": null,
                "closedSprints": [
                    {
                        "id": 1,
                        "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/agile/1.0/sprint/1",
                        "state": "closed",
                        "name": "UN Sprint 1",
                        "startDate": "2024-04-02T03:00:53.736Z",
                        "endDate": "2024-04-09T03:00:00.000Z",
                        "completeDate": "2024-04-10T00:02:13.379Z",
                        "createdDate": "2024-04-09T23:37:05.051Z",
                        "originBoardId": 3,
                        "goal": "Essa sprint espero conseguir fazer as coisas, obrigado por tudo :D"
                    }
                ],
                "progress": {
                    "progress": 0,
                    "total": 0
                },
                "comment": {
                    "comments": [],
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/10013/comment",
                    "maxResults": 0,
                    "total": 0,
                    "startAt": 0
                },
                "votes": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/UN-3/votes",
                    "votes": 0,
                    "hasVoted": false
                },
                "worklog": {
                    "startAt": 0,
                    "maxResults": 20,
                    "total": 0,
                    "worklogs": []
                }
            }
        },
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            "id": "10011",
            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/agile/1.0/issue/10011",
            "key": "UN-1",
            "fields": {
                "statuscategorychangedate": "2024-04-09T21:02:01.916-0300",
                "issuetype": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issuetype/10010",
                    "id": "10010",
                    "description": "Stories track functionality or features expressed as user goals.",
                    "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium",
                    "name": "Story",
                    "subtask": false,
                    "avatarId": 10315,
                    "entityId": "4a244c1c-de05-4c80-a842-1f87eff4c1ed",
                    "hierarchyLevel": 0
                },
                "parent": {
                    "id": "10017",
                    "key": "UN-7",
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/10017",
                    "fields": {
                        "summary": "Pix",
                        "status": {
                            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/status/10010",
                            "description": "",
                            "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/",
                            "name": "To Do",
                            "id": "10010",
                            "statusCategory": {
                                "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/statuscategory/2",
                                "id": 2,
                                "key": "new",
                                "colorName": "blue-gray",
                                "name": "To Do"
                            }
                        },
                        "priority": {
                            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/priority/3",
                            "iconUrl": "https://manoel-martins.atlassian.net/images/icons/priorities/medium.svg",
                            "name": "Medium",
                            "id": "3"
                        },
                        "issuetype": {
                            "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issuetype/10013",
                            "id": "10013",
                            "description": "Epics track collections of related bugs, stories, and tasks.",
                            "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
                            "name": "Epic",
                            "subtask": false,
                            "avatarId": 10307,
                            "entityId": "9c5137e4-e5a2-4c27-a76e-d0bfa4c1f0f7",
                            "hierarchyLevel": 1
                        }
                    }
                },
                "timespent": null,
                "sprint": null,
                "customfield_10030": null,
                "project": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/project/10002",
                    "id": "10002",
                    "key": "UN",
                    "name": "Undefined",
                    "projectTypeKey": "software",
                    "simplified": true,
                    "avatarUrls": {
                        "48x48": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422",
                        "24x24": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=small",
                        "16x16": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=xsmall",
                        "32x32": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/universal_avatar/view/type/project/avatar/10422?size=medium"
                    }
                },
                "customfield_10031": null,
                "customfield_10032": [],
                "customfield_10033": null,
                "fixVersions": [],
                "aggregatetimespent": null,
                "customfield_10034": null,
                "resolution": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/resolution/10000",
                    "id": "10000",
                    "description": "Work has been completed on this issue.",
                    "name": "Done"
                },
                "customfield_10036": null,
                "customfield_10037": null,
                "customfield_10027": null,
                "customfield_10028": null,
                "customfield_10029": null,
                "resolutiondate": "2024-04-09T21:02:01.911-0300",
                "workratio": -1,
                "watches": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/UN-1/watchers",
                    "watchCount": 1,
                    "isWatching": true
                },
                "issuerestriction": {
                    "issuerestrictions": {},
                    "shouldDisplay": true
                },
                "lastViewed": "2024-04-10T00:47:39.993-0300",
                "created": "2024-04-09T20:59:52.411-0300",
                "customfield_10020": [
                    {
                        "id": 1,
                        "name": "UN Sprint 1",
                        "state": "closed",
                        "boardId": 3,
                        "goal": "Essa sprint espero conseguir fazer as coisas, obrigado por tudo :D",
                        "startDate": "2024-04-02T03:00:53.736Z",
                        "endDate": "2024-04-09T03:00:00.000Z",
                        "completeDate": "2024-04-10T00:02:13.379Z"
                    }
                ],
                "customfield_10021": null,
                "epic": null,
                "customfield_10022": null,
                "customfield_10023": null,
                "priority": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/priority/3",
                    "iconUrl": "https://manoel-martins.atlassian.net/images/icons/priorities/medium.svg",
                    "name": "Medium",
                    "id": "3"
                },
                "customfield_10024": null,
                "customfield_10025": "10010_*:*_1_*:*_129542_*|*_10012_*:*_1_*:*_0",
                "labels": [
                    "Transferência"
                ],
                "customfield_10026": null,
                "customfield_10016": null,
                "customfield_10017": null,
                "customfield_10018": {
                    "hasEpicLinkFieldDependency": false,
                    "showField": false,
                    "nonEditableReason": {
                        "reason": "PLUGIN_LICENSE_ERROR",
                        "message": "The Parent Link is only available to Jira Premium users."
                    }
                },
                "customfield_10019": "0|i0001b:",
                "aggregatetimeoriginalestimate": null,
                "timeestimate": null,
                "versions": [],
                "issuelinks": [],
                "assignee": null,
                "updated": "2024-04-10T00:30:29.949-0300",
                "status": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/status/10012",
                    "description": "",
                    "iconUrl": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/",
                    "name": "Done",
                    "id": "10012",
                    "statusCategory": {
                        "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/statuscategory/3",
                        "id": 3,
                        "key": "done",
                        "colorName": "green",
                        "name": "Done"
                    }
                },
                "components": [],
                "timeoriginalestimate": null,
                "description": null,
                "customfield_10010": null,
                "customfield_10014": null,
                "timetracking": {},
                "customfield_10015": null,
                "customfield_10005": null,
                "customfield_10006": null,
                "customfield_10007": null,
                "security": null,
                "customfield_10008": null,
                "aggregatetimeestimate": null,
                "customfield_10009": null,
                "attachment": [],
                "flagged": false,
                "summary": "Envio Pix",
                "creator": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/user?accountId=5dbe13d06acc0b0c2f11a2ff",
                    "accountId": "5dbe13d06acc0b0c2f11a2ff",
                    "emailAddress": "mano.martins29@gmail.com",
                    "avatarUrls": {
                        "48x48": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "24x24": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "16x16": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "32x32": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png"
                    },
                    "displayName": "manoel martins",
                    "active": true,
                    "timeZone": "America/Sao_Paulo",
                    "accountType": "atlassian"
                },
                "subtasks": [],
                "customfield_10040": null,
                "customfield_10041": null,
                "customfield_10042": [],
                "reporter": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/user?accountId=5dbe13d06acc0b0c2f11a2ff",
                    "accountId": "5dbe13d06acc0b0c2f11a2ff",
                    "emailAddress": "mano.martins29@gmail.com",
                    "avatarUrls": {
                        "48x48": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "24x24": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "16x16": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png",
                        "32x32": "https://secure.gravatar.com/avatar/cd66188f81ebafbdf98095d02adb87e0?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FMM-2.png"
                    },
                    "displayName": "manoel martins",
                    "active": true,
                    "timeZone": "America/Sao_Paulo",
                    "accountType": "atlassian"
                },
                "aggregateprogress": {
                    "progress": 0,
                    "total": 0
                },
                "customfield_10044": null,
                "customfield_10045": null,
                "customfield_10001": null,
                "customfield_10002": null,
                "customfield_10046": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/customFieldOption/10020",
                    "value": "X-TREME",
                    "id": "10020"
                },
                "customfield_10003": null,
                "customfield_10047": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/customFieldOption/10022",
                    "value": "Conta Digital",
                    "id": "10022"
                },
                "customfield_10004": null,
                "customfield_10038": null,
                "environment": null,
                "duedate": null,
                "closedSprints": [
                    {
                        "id": 1,
                        "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/agile/1.0/sprint/1",
                        "state": "closed",
                        "name": "UN Sprint 1",
                        "startDate": "2024-04-02T03:00:53.736Z",
                        "endDate": "2024-04-09T03:00:00.000Z",
                        "completeDate": "2024-04-10T00:02:13.379Z",
                        "createdDate": "2024-04-09T23:37:05.051Z",
                        "originBoardId": 3,
                        "goal": "Essa sprint espero conseguir fazer as coisas, obrigado por tudo :D"
                    }
                ],
                "progress": {
                    "progress": 0,
                    "total": 0
                },
                "votes": {
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/UN-1/votes",
                    "votes": 0,
                    "hasVoted": false
                },
                "comment": {
                    "comments": [],
                    "self": "https://api.atlassian.com/ex/jira/823d4cf1-5e56-4678-bf3e-d971639c97c7/rest/api/2/issue/10011/comment",
                    "maxResults": 0,
                    "total": 0,
                    "startAt": 0
                },
                "worklog": {
                    "startAt": 0,
                    "maxResults": 20,
                    "total": 0,
                    "worklogs": []
                }
            }
        }
    ],
    "names": {
        "statuscategorychangedate": "Status Category Changed",
        "parent": "Parent",
        "issuetype": "Issue Type",
        "timespent": "Time Spent",
        "sprint": "Sprint",
        "customfield_10030": "Total forms",
        "project": "Project",
        "customfield_10031": "Approvals",
        "customfield_10032": "Request participants",
        "customfield_10033": "Satisfaction",
        "fixVersions": "Fix versions",
        "aggregatetimespent": "Σ Time Spent",
        "customfield_10034": "Satisfaction date",
        "resolution": "Resolution",
        "customfield_10036": "Request language",
        "customfield_10037": "Approver groups",
        "customfield_10027": "Locked forms",
        "customfield_10028": "Open forms",
        "customfield_10029": "Submitted forms",
        "resolutiondate": "Resolved",
        "workratio": "Work Ratio",
        "watches": "Watchers",
        "lastViewed": "Last Viewed",
        "issuerestriction": "Restrict to",
        "created": "Created",
        "customfield_10020": "Sprint",
        "customfield_10021": "Flagged",
        "epic": "Epic",
        "customfield_10022": "Target start",
        "customfield_10023": "Target end",
        "priority": "Priority",
        "customfield_10024": "[CHART] Date of First Response",
        "customfield_10025": "[CHART] Time in Status",
        "customfield_10026": "Work category",
        "labels": "Labels",
        "customfield_10016": "Story point estimate",
        "customfield_10017": "Issue color",
        "customfield_10018": "Parent Link",
        "customfield_10019": "Rank",
        "aggregatetimeoriginalestimate": "Σ Original Estimate",
        "timeestimate": "Remaining Estimate",
        "versions": "Affects versions",
        "issuelinks": "Linked Issues",
        "assignee": "Assignee",
        "updated": "Updated",
        "status": "Status",
        "components": "Components",
        "timeoriginalestimate": "Original estimate",
        "description": "Description",
        "customfield_10010": "Request Type",
        "customfield_10014": "Epic Link",
        "customfield_10015": "Start date",
        "timetracking": "Time tracking",
        "customfield_10005": "Change type",
        "customfield_10006": "Change risk",
        "security": "Security Level",
        "customfield_10007": "Change reason",
        "customfield_10008": "Actual start",
        "customfield_10009": "Actual end",
        "aggregatetimeestimate": "Σ Remaining Estimate",
        "attachment": "Attachment",
        "flagged": "Flagged",
        "summary": "Summary",
        "creator": "Creator",
        "subtasks": "Sub-tasks",
        "customfield_10040": "Time to resolution",
        "customfield_10041": "Time to first response",
        "customfield_10042": "Responders",
        "reporter": "Reporter",
        "customfield_10044": "Atlas project key",
        "aggregateprogress": "Σ Progress",
        "customfield_10045": "Atlas project status",
        "customfield_10001": "Team",
        "customfield_10046": "Squad",
        "customfield_10002": "Organizations",
        "customfield_10047": "Modules",
        "customfield_10003": "Approvers",
        "customfield_10004": "Impact",
        "customfield_10038": "Affected services",
        "environment": "Environment",
        "duedate": "Due date",
        "closedSprints": "Closed sprint",
        "progress": "Progress",
        "comment": "Comment",
        "votes": "Votes",
        "worklog": "Log Work"
    }
};
var program = new commander_1.Command();
program
    .version('1.0.0')
    .description('A simple CLI created with Node.js and commander.js')
    .option('-g, --greet <name>', 'Greet the user with a custom name')
    .parse(process.argv);
if (program.opts().greet) {
    console.log("Hello, ".concat(program.opts().greet, "!"));
}
else {
    var name_1 = Object.entries(mock1.names).find(function (_a) {
        var name = _a[1];
        return name === 'Squad';
    });
    var closedSprints = mock.values.filter(function (sprint) { return sprint.state === 'closed'; });
    var sprintsBySquad = closedSprints.reduce(function (acc, sprint) {
        if (!acc[sprint.originBoardId]) {
            acc[sprint.originBoardId] = [];
        }
        acc[sprint.originBoardId].push(sprint);
        return acc;
    }, {});
    var lastSprintsBySquad = Object.values(sprintsBySquad).map(function (sprints) {
        //@ts-ignore
        sprints.sort(function (a, b) { return new Date(b.endDate) - new Date(a.endDate); });
        var issueSummaries = mock1.issues.map(function (issue) {
            var _a;
            // @ts-ignore
            var module = name_1 ? (_a = issue.fields[name_1[0]]) === null || _a === void 0 ? void 0 : _a.value : null;
            return {
                key: issue.key,
                module: module,
                summary: issue.fields.summary,
                parent: {
                    key: issue.fields.parent.key,
                    summary: issue.fields.parent.fields.summary,
                },
            };
        });
        return {
            sprint: sprints[0],
            issues: issueSummaries,
        };
    });
    var doc = new docx_1.Document({
        sections: [{
                properties: {},
                children: lastSprintsBySquad[0].issues.map(function (issue) { return new docx_1.Paragraph({
                    text: "".concat(issue.key, " - ").concat(issue.summary),
                    bullet: {
                        level: 0
                    }
                }); })
                // new Paragraph({
                //     children: [
                //         new TextRun("Hello World"),
                //         new TextRun({
                //             text: "Foo Bar",
                //             bold: true,
                //         }),
                //         new TextRun({
                //             text: "\tGithub is the best",
                //             bold: true,
                //         }),
                //     ],
                // }),
            }],
    });
    docx_1.Packer.toBuffer(doc).then(function (buffer) {
        // Write the buffer to a file
        (0, fs_1.writeFileSync)("example.docx", buffer);
        console.log("Word document created successfully.");
    }).catch(function (error) {
        console.log("Error occurred while creating the Word document:", error);
    });
    console.log(lastSprintsBySquad[0]);
}
