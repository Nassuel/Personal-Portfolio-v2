import NextLink from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import SectionTitle from "@/components/editorial/section-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NotFound = () => (
    <div className="mx-auto max-w-[40rem] py-10">
        <SectionTitle as="h1">Not found</SectionTitle>
        <p>The page you&apos;re looking for was not found.</p>
        <Separator className="my-6 bg-rule/30" />
        <div className="my-6 text-center">
            <Button nativeButton={false} render={<NextLink href="/" />}>
                <IoHomeSharp aria-hidden />
                Return to home
            </Button>
        </div>
    </div>
);

export default NotFound;
