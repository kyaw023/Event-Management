type Props = {
  children: React.ReactNode;
  className?: string;
};

const ContainerComponent = ({ className, children }: Props) => {
  return (
    <div className={`w-full md:w-[720px]  lg:w-[1200px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default ContainerComponent;
