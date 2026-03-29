# shadcn/ui 고급 패턴 & 커스터마이징

## 컴포넌트 variant 확장

shadcn 버튼에 Figma에만 있는 커스텀 variant를 추가하는 방법:

```tsx
// src/components/ui/button.tsx 수정
const buttonVariants = cva(
  "inline-flex items-center ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ...",
        destructive: "bg-destructive ...",
        outline: "border border-input ...",
        // Figma 디자인의 커스텀 variant 추가
        brand: "bg-brand-500 text-white hover:bg-brand-600",
        soft: "bg-primary/10 text-primary hover:bg-primary/20",
      },
    },
  }
)
```

## Form 패턴 (shadcn Form + react-hook-form + zod)

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
})

type FormValues = z.infer<typeof formSchema>

function LoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">로그인</Button>
      </form>
    </Form>
  )
}
```

## Dialog (Modal) 패턴

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function ConfirmDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">삭제</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button variant="destructive" onClick={onConfirm}>삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## Card 레이아웃 패턴

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProductCardProps {
  title: string
  description: string
  price: number
  tag?: string
  imageUrl?: string
}

function ProductCard({ title, description, price, tag, imageUrl }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {tag && <Badge variant="secondary">{tag}</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <span className="text-2xl font-bold">₩{price.toLocaleString()}</span>
      </CardFooter>
    </Card>
  )
}
```

## Navigation 패턴

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

function AppNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>제품</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <a href="/products" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                    <div className="text-sm font-medium leading-none">전체 제품</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      모든 제품을 둘러보세요
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

## Sheet (사이드 패널) 패턴

Figma에서 사이드 드로어/패널로 표시된 요소:

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">장바구니 열기</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>장바구니</SheetTitle>
          <SheetDescription>담은 상품 목록입니다.</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {/* 장바구니 아이템 */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

## Tabs 패턴

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ProfileTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="notifications">알림</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        {/* 프로필 내용 */}
      </TabsContent>
      <TabsContent value="account">
        {/* 계정 내용 */}
      </TabsContent>
      <TabsContent value="notifications">
        {/* 알림 내용 */}
      </TabsContent>
    </Tabs>
  )
}
```

## cn() 유틸리티 활용 패턴

복잡한 조건부 스타일링:

```tsx
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "active" | "inactive" | "pending"
  className?: string
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        {
          "bg-green-100 text-green-800": status === "active",
          "bg-gray-100 text-gray-800": status === "inactive",
          "bg-yellow-100 text-yellow-800": status === "pending",
        },
        className
      )}
    >
      {status}
    </span>
  )
}
```

## 반응형 그리드 패턴

Figma에 Desktop/Tablet/Mobile 프레임이 있을 때:

```tsx
// 3열 → 2열 → 1열
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
  {items.map((item) => <ItemCard key={item.id} {...item} />)}
</div>

// Sidebar 레이아웃
<div className="flex flex-col lg:flex-row gap-6">
  <aside className="w-full lg:w-64 flex-shrink-0">
    {/* 사이드바 */}
  </aside>
  <main className="flex-1 min-w-0">
    {/* 메인 콘텐츠 */}
  </main>
</div>
```
