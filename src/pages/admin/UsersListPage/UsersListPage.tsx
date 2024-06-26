import cl from './UsersListPage.module.scss';
import { useHideFooter } from '@/hooks/useLayout';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity } from '@/components/layout/Activity/Activity';
import PersonService from '@/api/services/PersonService';
import { IUser } from '@/api/models/Person';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
   ContextMenu,
   IContextMenuItem,
} from '@/components/UI/ContextMenu/ContextMenu';

interface Props {}

const UsersListPage: React.FC<Props> = () => {
   useHideFooter();
   const [search, setSearch] = useState('');
   const [users, setUsers] = useState<IUser[]>([]);
   const [isMenuShow, setIsMenuShow] = useState(false);
   const navigate = useNavigate();
   const [currentPerson, setCurrentPerson] = useState<IUser | null>(null);
   const contextMenuRef = useRef<HTMLDivElement | null>(null);
   const [contextMenuList, setContextMenuList] = useState<IContextMenuItem[]>([
      {
         handleClick: handleOpenProfile,
         title: 'Открыть профиль',
      },
      {
         handleClick: handleManagePerson,
         title: currentPerson?.banned
            ? 'Разбанить чувачка'
            : 'Забанить чувачка',
      },
      {
         handleClick: handleToggleRole,
         title: currentPerson?.roles.includes('MODERATOR')
            ? 'Забрать модератора'
            : 'Подарить модератора',
      },
   ]);

   useEffect(() => {
      setContextMenuList([
         {
            handleClick: handleOpenProfile,
            title: 'Открыть профиль',
         },
         {
            handleClick: handleManagePerson,
            title: currentPerson?.banned
               ? 'Разбанить чувачка'
               : 'Забанить чувачка',
         },
         {
            handleClick: handleToggleRole,
            title: currentPerson?.roles.includes('MODERATOR')
               ? 'Забрать модератора'
               : 'Подарить модератора',
         },
      ]);
   }, [currentPerson]);

   useEffect(() => {
      PersonService.getAllModerators().then((res) => {
         setUsers(res.data);
      });
   }, []);

   function debounce<T extends (...args: any[]) => any>(
      func: T,
      delay: number,
   ): (...args: Parameters<T>) => void {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      return (...args) => {
         if (timeoutId) {
            clearTimeout(timeoutId);
         }
         timeoutId = setTimeout(() => {
            func(...args);
         }, delay);
      };
   }

   const fetchUsers = useCallback((username: string) => {
      console.log(username);
      try {
         if (username.length) {
            const response = PersonService.getPersonByUsername(username)
               .then((res) => {
                  setUsers([res.data]);
               })
               .catch(() => {
                  setUsers([]);
               });
            // toast.promise(response, {
            //    error: {
            //       render({ data }) {
            //          return `${data}`.includes('404')
            //             ? 'Пользователь с таким username не найден'
            //             : 'Опять ебаная ошибка(';
            //          // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
            //       },
            //    },
            // })
         } else {
            PersonService.getAllModerators().then((res) => {
               setUsers(res.data);
            });
         }
      } catch (e) {}
   }, []);

   const debounceFetchUsers = useCallback(
      debounce((username: string) => fetchUsers(username), 500),
      [fetchUsers],
   );

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setSearch()
      debounceFetchUsers(e.target.value);
   };

   const handleClickOnPerson = (
      e: React.MouseEvent<HTMLLIElement, MouseEvent>,
      person: IUser,
   ) => {
      e.preventDefault();

      if (!contextMenuRef.current) return;

      contextMenuRef.current.style.top = `${e.clientY + 5}px`;
      contextMenuRef.current.style.left = `${e.clientX + 5}px`;
      console.log(person);
      setCurrentPerson(person);
      console.log(currentPerson);
      setIsMenuShow((prev) => (prev ? false : true));
   };

   // const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
   //    setTooltipPosition({ x: event.clientX, y: event.clientY });
   //    setTooltipText('This is a tooltip');
   //  };
   function handleOpenProfile() {
      console.log(currentPerson);

      if (!currentPerson) return;
      navigate(`/profile/${currentPerson.id}`);
   }

   function handleManagePerson() {
      if (!currentPerson) return;

      const type = currentPerson.banned ? 'unban' : 'ban';
      try {
         const response = PersonService.managePerson(type, currentPerson.id);

         toast.promise(response, {
            success: `${type === 'ban' ? 'Пользователь улетел в бан, нахуй' : 'Помилование прошло успешно'}`,
            error: {
               render({ data }) {
                  return `${data}`.includes('403')
                     ? 'У тебя недостаточно прав, ало'
                     : type === 'ban'
                       ? 'Не получилось забанить('
                       : 'Не получилось помиловать(';
                  // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
               },
            },
         });
      } catch (e) {
         console.log(e);
      }
   }
   function handleToggleRole() {
      if (!currentPerson) return;

      try {
         PersonService.getPerson(currentPerson.id).then((res) => {
            const newPerson = res.data;

            setCurrentPerson(newPerson);

            const isModerator = newPerson.roles.includes('MODERATOR');

            const type = isModerator ? 'remove' : 'add';
            const response = PersonService.toggleRole(type, newPerson.id);

            toast.promise(response, {
               success: `${type === 'add' ? 'Он теперь модератор' : 'Он больше не модератор, аахахах, туда его'}`,
               error: {
                  render({ data }) {
                     return `${data}`.includes('403')
                        ? 'У тебя недостаточно прав, ало'
                        : type === 'add'
                          ? 'Не получилось сделать модератором('
                          : 'Не получилось забрать роль(';
                     // .status === 409 ? 'Данный email уже занят' : 'Необработанная ошибка'
                  },
               },
            });
         });
      } catch (e) {
         console.log(e);
      }
   }

   const getOrderRole = (roles: string[]): string | null => {
      return roles.includes('ADMIN')
         ? 'ADMIN'
         : roles.includes('MODERATOR')
           ? 'MODERATOR'
           : roles.includes('VERIFIED')
             ? 'VERIFIED'
             : 'NONE';
   };

   return (
      <div className={cl.page}>
         <div className={cl.usersList}>
            <div className={cl.usersList__header}>
               <input
                  placeholder="Username"
                  type="text"
                  onChange={handleSearch}
               />
            </div>
            <div className={cl.usersList__main}>
               <div className={cl.usersList__line}>
                  <div className={cl.usersList__column}>STAFF TYPE</div>
                  <div className={cl.usersList__column}>USERNAME</div>
               </div>
               <ul className={cl.usersList__body}>
                  {users.length ? (
                     users.map((user) => (
                        <li
                           className={[cl.usersList__line, cl.user].join(' ')}
                           key={user.username}
                           onClick={(e) => handleClickOnPerson(e, user)}
                           onContextMenu={(e) => handleClickOnPerson(e, user)}
                        >
                           <div className={cl.usersList__column}>
                              {getOrderRole(user.roles)}
                           </div>
                           <div className={cl.usersList__column}>
                              {user.username}
                           </div>
                        </li>
                     ))
                  ) : (
                     <li className={cl.no_products}>Пользователи не найдены</li>
                  )}
               </ul>
            </div>
         </div>
         <Activity />
         <div className={cl.contextMenuContainer} ref={contextMenuRef}>
            <ContextMenu isShow={isMenuShow} list={contextMenuList} />
         </div>
      </div>
   );
};

export default UsersListPage;
