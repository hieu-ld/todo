import type { FilterType } from "@/lib/types";




const Footer = ({completedTasksCount = 0, activeTasksCount = 0}: FilterType) => {

    return (
        <>
            {completedTasksCount + activeTasksCount > 0 && (
                <div className="text-center">
                    <p className="text-sm">
                        {
                            completedTasksCount > 0 && (
                                <>
                                    Tuyệt vời, bạn đã hoàn thành {completedTasksCount} việc
                                    {
                                        activeTasksCount > 0 && `, còn ${activeTasksCount} việc chưa làm, cố lên!`
                                    }
                                </>
                            )
                        }

                        {completedTasksCount === 0 && activeTasksCount > 0 && (
                            <>
                                Hãy bắt đầu làm {activeTasksCount} nhiệm vụ!
                            </>
                        )}
                    </p>
                </div>
            )}
        </>
    );
};

export default Footer;
