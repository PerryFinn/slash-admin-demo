import dayjs from "dayjs";
import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme-vars";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Popover, PopoverTrigger } from "@/ui/popover";
import { Textarea } from "@/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { Text, Title } from "@/ui/typography";
import styles from "./task-detail.module.less";
import { type Task, TaskPriority } from "./types";

type Props = {
  task: Task;
};
export default function TaskDetail({ task }: Props) {
  const { title, reporter, assignee = [], tags = [], date, priority, description, attachments, comments = [] } = task;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <Title as="h4">{title}</Title>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Reporter</div>
          <Avatar>
            <AvatarImage src={reporter} alt="@shadcn" />
          </Avatar>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Assignee</div>

          <div className="flex gap-2">
            {assignee.map((item) => (
              <Avatar key={item}>
                <AvatarImage src={item} alt="@shadcn" />
              </Avatar>
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>Tag</div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="info">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Due Date</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"}>{date ? dayjs(date).format("DD/MM/YYYY") : <span>Pick a date</span>}</Button>
            </PopoverTrigger>
          </Popover>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Priority</div>
          <ToggleGroup type="single" defaultValue={priority}>
            <ToggleGroupItem value={TaskPriority.HIGH}>
              <Icon icon="local:ic-rise" size={20} color={themeVars.colors.palette.warning.default} />
            </ToggleGroupItem>
            <ToggleGroupItem value={TaskPriority.MEDIUM}>
              <Icon
                icon="local:ic-rise"
                size={20}
                color={themeVars.colors.palette.success.default}
                className="rotate-90"
              />
            </ToggleGroupItem>
            <ToggleGroupItem value={TaskPriority.LOW}>
              <Icon
                icon="local:ic-rise"
                size={20}
                color={themeVars.colors.palette.info.default}
                className="rotate-180"
              />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Description</div>
          <Textarea defaultValue={description} />
        </div>

        <div className={styles.item}>
          <div className={styles.label}>Attachments</div>
          <div className="flex gap-2 flex-wrap">
            {attachments?.map((item) => (
              <img key={item} src={item} width={62} height={62} className="rounded-lg" alt="" />
            ))}
          </div>
        </div>
      </div>
      {/* comments */}
      <div
        className="flex flex-col gap-4"
        style={{
          padding: "24px 20px 40px",
        }}
      >
        {comments?.map(({ avatar, username, content, time }) => (
          <div key={username} className="flex gap-4">
            <Avatar>
              <AvatarImage src={avatar} alt="@shadcn" />
            </Avatar>
            <div className="flex grow flex-col flex-wrap gap-1 text-gray">
              <div className="flex justify-between">
                <Text variant="caption" color="secondary">
                  {username}
                </Text>
                <Text variant="caption" color="secondary">
                  {dayjs(time).format("DD/MM/YYYY HH:mm")}
                </Text>
              </div>
              <p>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
