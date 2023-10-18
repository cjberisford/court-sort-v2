import React from "react";

type Props = {
  title: String,
  subtitle: String,
};

const PageHeader: React.FC<Props> = (props) => (
  <div>
    <div className="flex justify-between pt-2">
      <div>
        <span className="text-6xl text-foreground/75 font-extralight leading-none tracking-tight">{props.title}</span>
      </div>
      <div className=" flex items-end">
        <span className="text-5xl text-primary/75 uppercase font-bold flex-end inline-block align-bottom"> {props.subtitle}</span>
      </div>
    </div>
    <div className="h-[2px] p-0 m-0 bg-gradient-to-r to-primary from-transparent mb-8"></div>
  </div>

)

export default PageHeader;
