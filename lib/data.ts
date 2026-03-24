export interface ExperienceIcon {
    url: string;
    padding: string;
    mobilePadding: string;
    height: number;
    width: number;
}

export interface Experience {
    title: string;
    company: string;
    location: string;
    description: string;
    icon: ExperienceIcon;
    date: string;
    link: string;
}

export interface Education {
    school: string;
    schoolLink: string;
    startDate: string;
    endDate: string;
    degreeType: string;
    major: string;
    minor: string;
}

export interface Skill {
    skill: string;
    link: string;
}

export interface Certification {
    name: string;
    link: string;
}

export interface AboutMe {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
}

export interface Socials {
    ig: string;
    github: string;
    linkedin: string;
    email: string;
}

export const experiencesData: readonly Experience[] = [
    {
        title: "Sr. Technology Asset Specialist | Asset Engineer",
        company: "Smartsheet",
        location: "Bellevue, WA - Hybrid",
        description: `Lead global technology asset management operations across multiple regions, overseeing
        the complete lifecycle of hardware and software assets for enterprise-scale deployments while driving
        strategic initiatives in license optimization and compliance. Architect and implement automated asset
        tracking systems and tooling solutions that enhance visibility, accuracy, and operational efficiency,
        leveraging data analysis and reporting frameworks to provide actionable insights for stakeholder
        decision-making. Collaborate cross-functionally with IT, Finance, Procurement, and business units to
        streamline asset management processes, improve vendor relationships, and implement scalable solutions
        using industry-leading platforms, with a focus on continuous process improvement through automation to
        reduce manual overhead and increase data accuracy across global operations.
        `,
        icon: {
            url: "/icons/smartsheet-logo-blue-new.svg.svg",
            padding: ".88rem 0rem 0rem .98rem",
            mobilePadding: ".2rem 0rem 0rem .275rem",
            height: 30,
            width: 30
        },
        date: "February 2026 - Present",
        link: "www.smartsheet.com"
    },
    {
        title: "IT Asset Manager",
        company: "Smartsheet",
        location: "Bellevue, WA - Hybrid",
        description: `I oversee the complete lifecycle of technology assets from procurement through disposal,
            ensuring accurate inventory tracking and optimal resource utilization across the organization.
            My responsibilities include maintaining detailed asset databases, managing software licensing
            compliance, coordinating hardware deployments and refreshes, and developing policies that align
            IT investments with business objectives. I analyze asset performance data to inform budgeting
            decisions, identify cost-saving opportunities, and ensure regulatory compliance while minimizing
            risk exposure through proper documentation and audit-ready reporting.`,
        icon: {
            url: "/icons/smartsheet-logo-blue-new.svg.svg",
            padding: ".88rem 0rem 0rem .98rem",
            mobilePadding: ".2rem 0rem 0rem .275rem",
            height: 30,
            width: 30
        },
        date: "October 2025 - February 2026",
        link: "www.smartsheet.com"
    },
    {
        title: "Freelance Software Engineer",
        company: "Self-Employed",
        location: "Lynnwood, WA",
        description: `Designed, developed, and maintained custom web applications for small-mid size companies.`,
        icon: {
            url: "/icons/smartsheet-logo-blue-new.svg.svg",
            padding: ".88rem 0rem 0rem .98rem",
            mobilePadding: ".2rem 0rem 0rem .275rem",
            height: 30,
            width: 30
        },
        date: "November 2023 - Present",
        link: "www.nassuel.com/freelancing"
    },
    {
        title: "Software Engineer",
        company: "T-Mobile",
        location: "Bellevue, WA - Hybrid",
        description: `Full-stack developer, occasionally stepped into data engineering and data science.
             Owned multiple applications end-to-end concurrently. Created and maintained applications
             which behaved as Saas, PaaS, and IaaS. Pipelines and workflows handling 1+ millions of rows
             daily.`,
        icon: {
            url: "/icons/t-mobile-t.svg",
            padding: ".88rem 0rem 0rem .98rem",
            mobilePadding: ".2rem 0rem 0rem .275rem",
            height: 30,
            width: 30
        },
        date: "July 2019 - June 2023",
        link: "www.t-mobile.com"
    },
    {
        title: "Software Engineer Intern",
        company: "T-Mobile",
        location: "Bellevue, WA - On-site",
        description: `Designed and developed custom web applications and databases to drive business success
             and meet corporate objectives. Implemented new system functionality and streamlining internal
             processes in an agile development model.`,
        icon: {
            url: "/icons/t-mobile-t.svg",
            padding: ".88rem 0rem 0rem .98rem",
            mobilePadding: ".2rem 0rem 0rem .275rem",
            height: 30,
            width: 30
        },
        date: "February 2019 - June 2019",
        link: "www.t-mobile.com"
    },
    {
        title: "Business Intelligence Intern",
        company: "T-Mobile",
        location: "Bellevue, WA - On-site",
        description: `Operated as a Business Intelligence Manager to design, develop, improve, and support BI
             information and processes, supply chain procedures, and contract negotiations.`,
        icon: {
            url: "/icons/t-mobile-t.svg",
            padding: ".88rem 0rem 0rem .98rem",
            mobilePadding: ".2rem 0rem 0rem .275rem",
            height: 30,
            width: 30
        },
        date: "June 2018 - February 2019",
        link: "www.t-mobile.com"
    },
    {
        title: "Hardware Engineer, Student",
        company: "Chelan County PUD",
        location: "Bellevue, WA - On-site",
        description: `Delivered proof of concept of a hydroelectric unit data acquisition and transmission system.
             The system was comprised of a temperature, strain, conductivity, and accelerometer sensors connected
             to an embedded system for installation on the rotor of a hydroelectric turbine-generator, and transmit
             collected data wirelessly.`,
        icon: {
            url: "/icons/chelan-county-pud.ico",
            padding: ".35rem 0rem 0rem .35rem",
            mobilePadding: "",
            height: 50,
            width: 50
        },
        date: "October 2018 - June 2019",
        link: "www.chelanpud.org/"
    }
];

export const educationData: readonly Education[] = [
    {
        school: "Seattle University",
        schoolLink: "seattleu.edu",
        startDate: "2025",
        endDate: "2027",
        degreeType: "Master of Science",
        major: "Computer Science, Software Engineering specialization",
        minor: ""
    },
    {
        school: "Seattle University",
        schoolLink: "seattleu.edu",
        startDate: "2017",
        endDate: "2019",
        degreeType: "Bachelor of Science",
        major: "Electrical Engineering, Computer Engineering specialization",
        minor: "Computer Science"
    },
    {
        school: "Everett Community College",
        schoolLink: "everettcc.edu",
        startDate: "2015",
        endDate: "2017",
        degreeType: "Associate of Science",
        major: "Electrical/Electronic Engineering",
        minor: ""
    }
];

export const skillsData: readonly Skill[] = [
    { skill: "JavaScript", link: "www.javascript.com/" },
    { skill: "TypeScript", link: "www.typescriptlang.org/" },
    { skill: "Python", link: "www.python.org/" },
    { skill: "Next.js", link: "nextjs.org/" },
    { skill: "Node.js", link: "nodejs.org/en/about" },
    { skill: "Agile", link: "en.wikipedia.org/wiki/Agile_software_development" },
    { skill: "Apache Spark", link: "spark.apache.org/" },
    { skill: "AWS", link: "aws.amazon.com/what-is-aws/?nc1=f_cc" },
    { skill: "Confluence", link: "www.atlassian.com/software/confluence" },
    { skill: "Data Structures & Algorithms", link: "" },
    { skill: "Development Operations (DevOps)", link: "" },
    { skill: "Docker", link: "" },
    { skill: "Figma", link: "" },
    { skill: "Git", link: "" },
    { skill: "HTML/CSS", link: "" },
    { skill: "Linux/Unix", link: "" },
    { skill: "Microsoft Azure", link: "azure.microsoft.com/en-us" },
    { skill: "Pandas", link: "" },
    { skill: "Postman", link: "" },
    { skill: "React", link: "" },
    { skill: "Kubernetes", link: "" },
    { skill: "Vue.js", link: "" },
    { skill: "Express.js", link: "" }
];

export const certificationData: readonly Certification[] = [
    {
        name: "Software Engineer",
        link: "www.hackerrank.com/certificates/009db8cf9566"
    },
    {
        name: "Frontend Developer (React)",
        link: "www.hackerrank.com/certificates/a1c66db849c0"
    },
    {
        name: "Intermediate SQL: Data Reporting and Analysis",
        link: "www.linkedin.com/learning/certificates/7d3603e4a8ea664a526486b260bff6bb91a05fff222160620283ad01a3cbea5f"
    },
    {
        name: "(2nd Edition) Dante Level 1 - English",
        link: "www.getdante.com/resources/training/dante-certification-program"
    }
];

export const aboutMe: AboutMe = {
    paragraph1: `With a deep passion for programming, I thrive on the challenge of building complex web applications.
    My experience as a full-stack developer encompasses both front-end and back-end development, allowing me to craft
    seamless user experiences from the ground up. I particularly relish the intricate details of the back-end,
    meticulously constructing the underlying architecture that powers a web application.`,
    paragraph2: `My expertise extends beyond traditional web development, as I also possess valuable experience as a
    data engineer and data scientist. This unique perspective has instilled in me a profound understanding of the
    importance of building scalable and reliable systems capable of handling large amounts of data.`,
    paragraph3: `I am driven by a fervent desire to utilize my skills to create innovative and user-friendly
    applications that make a positive impact within any company. I am perpetually seeking new challenges and
    opportunities that foster my growth as a full-stack developer. With my diverse skill set and unwavering dedication,
    I am confident in my ability to make significant contributions to any team. I am eager to continue my journey as a
    full-stack developer, leveraging my expertise to build groundbreaking applications that leave a lasting mark, not
    only due to the goal they've accomplish but for their maintainability.`
};

export const socials: Socials = {
    ig: "www.instagram.com/godspeed.pictura",
    github: "github.com/nassuel",
    linkedin: "www.linkedin.com/in/nassuelvc",
    email: "valeranassuel@gmail.com"
};
