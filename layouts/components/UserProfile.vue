<script setup>
import { useUserStore } from '~~/stores/user'
  import { storeToRefs } from 'pinia';
    const router = useRouter()
    const userStore = useUserStore()
    const { email,role} = storeToRefs(userStore)

    definePageMeta({
        middleware: 'is-logged-out'
    })

    onMounted(async () => {
        try {
            await userStore.getUser()
            
        } catch (error) {
            console.log(error)
        }
    })
    const logout = async () => {
        let res = confirm('Are you sure you want to sign out?')
        try {
            if (res) {
                await userStore.logout()
                localStorage.removeItem('token');
                router.push('/login')
                return
            }
        } catch (error) {
            console.log(error) 
        }
    }
</script>


<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold text-wrap" style="white-space: normal; word-break: break-word;">
              {{ email }} 
            </VListItemTitle>
            <VListItemTitle style="font-weight: bold; color: green;">
              {{ role }}
            </VListItemTitle>
            
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-user"
                size="22"
              />
            </template>

            <VListItemTitle>{{ $t('menu.profile') }}</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-cog"
                size="22"
              />
            </template>

            <VListItemTitle>{{ $t('menu.settings') }}</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>{{ $t('menu.pricing') }}</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-help-circle"
                size="22"
              />
            </template>

            <VListItemTitle>{{ $t('menu.faq') }}</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-log-out"
                size="22"
              />
            </template>

            <VListItemTitle>{{ $t('menu.logout') }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <div class="w-full h-full p-4 m-8 overflow-y-auto">
        <div class="flex items-center justify-center p-40 border-4 border-dotted">
            Profile of: {{ email }}
        </div>
    </div>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
