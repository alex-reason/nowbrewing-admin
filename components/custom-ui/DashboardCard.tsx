import { ReactElement } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

interface DashboardCardProps {
  cardTitle: string;
  cardContent: ReactElement;
  cardIcon?: ReactElement;
  optionalClassName?: string;
};

const DashboardCard = ({ cardTitle, cardContent, cardIcon, optionalClassName }: DashboardCardProps) => {
  return (
    <Card className={optionalClassName ? optionalClassName : "p-4"}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{cardTitle}</CardTitle>
        {cardIcon}
      </CardHeader>
      <CardContent>
        {cardContent}
      </CardContent>
    </Card>
  )
};

export default DashboardCard;