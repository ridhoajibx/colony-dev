import React, { useRef, useState } from 'react'
import Navbar from '../../components/Layouts/Header/Navbar';
import NavItem from '../../components/Layouts/Header/NavItem';
import MainLayout from '../../components/Layouts/MainLayout'
import { useDimensions } from '../../utils/useHooks/use-dimensions';
import Sidebars from '../../components/Layouts/Sidebar';

type Props = {}

function index({ }: Props) {
    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar)
    }
    return (
        <MainLayout
            title="Home"
            description="Home"
            images="../../../image/logo.png"
            logo="../../../image/logo.png"
            header="Home"
            sidebar={sidebar}
            handleSidebar={handleSidebar}
        >
            <Navbar
                fixed
                className=""
            >
                <NavItem
                    handleSidebar={handleSidebar}
                    defaultImage="../../../image/no-image.jpeg"
                    images="../../../image/logo.png"
                    logo="../../../image/logo.png"
                    header="Colony"
                />
            </Navbar>
            <Sidebars
                sidebar={sidebar}
                handleSidebar={handleSidebar}
                images={"../../../image/logo.png"}
                header={"Colony"}
            >
                <div className="px-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, nulla?
                </div>
            </Sidebars>
            <div className='w-full p-5 mt-24 md:pl-[21rem] '>
                <h3 className='font-bold'>main pages</h3>
                <div className='my-3 w-full'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias sapiente perspiciatis accusantium nobis dolor soluta, blanditiis repellendus architecto, molestiae ducimus ex dolorem animi ad doloremque! Aspernatur odit suscipit, eos qui cumque repellat quis incidunt quibusdam fugit et! Exercitationem non saepe sint soluta eligendi eius asperiores blanditiis, sapiente laborum, accusamus voluptates iste sunt tenetur. Recusandae, dolores nulla. Laborum voluptatem possimus aliquam fuga aspernatur ipsam maxime nisi, necessitatibus voluptatum cumque accusantium sapiente nam expedita est dolores? Nam sapiente, adipisci, cumque et perferendis in sint placeat totam at assumenda libero nulla, maiores exercitationem quasi voluptatum delectus voluptates molestiae consequuntur repellendus nihil. Quibusdam nam amet molestias delectus? Natus, deserunt ex suscipit corporis, dicta culpa nihil, exercitationem enim quasi consequuntur praesentium facere sequi sint tenetur sunt nisi veritatis hic temporibus pariatur. Harum doloremque aliquid provident possimus nostrum veritatis quis dolore libero praesentium quia eius, ducimus ipsam reiciendis ipsa? Aperiam obcaecati dignissimos saepe eius, incidunt inventore est ipsa, aut cumque enim iste earum totam praesentium ratione ad alias perspiciatis? Odit exercitationem ut, mollitia dolor expedita repellat, quasi at earum dolore magnam a optio distinctio aspernatur praesentium quo obcaecati commodi eligendi hic repellendus! Ipsum illo omnis consectetur atque! Aut, quod quibusdam! Consectetur veritatis assumenda autem officia praesentium dicta quas fugit. Nemo, perferendis aliquid rem explicabo aut dolor eligendi ad, ipsa distinctio deserunt fugit quam minus ex, obcaecati corrupti voluptatibus iure inventore quae fugiat saepe voluptate delectus id earum a. Voluptatibus quod temporibus possimus at error. Maxime a amet ab quia exercitationem nihil voluptatem. Eveniet saepe est laudantium? Doloribus asperiores nulla quaerat soluta ullam eum debitis molestiae cupiditate, ducimus eveniet aliquid laborum mollitia enim delectus velit saepe praesentium nesciunt impedit! Nam deleniti dicta doloribus et suscipit, ipsa ipsam minima, impedit minus aspernatur illum vitae nobis dolores maxime odit temporibus explicabo necessitatibus cumque ratione veritatis itaque exercitationem doloremque vero illo! Pariatur, illo ex. Laudantium reprehenderit inventore eum, labore doloribus ullam minus reiciendis repellendus, alias quidem velit praesentium delectus odio sequi, tempora corporis. Obcaecati tempore sunt fugiat nisi quas quos ut temporibus reprehenderit blanditiis recusandae unde neque laudantium numquam in saepe corporis, perferendis, minima sed aliquam fuga. Quibusdam deserunt a, minima consequatur voluptatibus eaque voluptatum dolorem nesciunt similique veritatis magnam, et aut. Dolorem, distinctio? Inventore quidem vero eveniet similique numquam, debitis officia quis aliquam dolor dicta eos doloremque necessitatibus officiis quisquam, autem excepturi, repellat commodi deserunt nam nesciunt distinctio et voluptatibus at molestias? Ea excepturi iste adipisci numquam nostrum nam? Labore omnis officia, praesentium minima fugit eligendi accusantium, facere alias dolor exercitationem corporis hic voluptas qui delectus quis cum doloremque. Veniam eos doloremque, in nesciunt ea necessitatibus, hic et quo quam repellendus laborum error excepturi! Laboriosam ad voluptatem, saepe odit doloremque quam amet commodi quas, magni harum necessitatibus reiciendis expedita repudiandae molestias delectus consectetur consequatur incidunt! Quas, temporibus. Consequuntur, porro. Doloremque harum est eligendi molestias, aliquid earum molestiae? A cupiditate asperiores voluptatibus sapiente saepe quam! Fugiat placeat quos natus omnis nisi hic magnam, quas deleniti ipsa at earum modi quisquam assumenda id itaque. Eos, iusto ut nostrum blanditiis maxime voluptas iste commodi, omnis consectetur optio molestiae facilis minima itaque esse quas quo amet, minus quasi excepturi? Nostrum recusandae enim pariatur sequi. Voluptates reprehenderit asperiores adipisci voluptatum, excepturi repudiandae nisi quod. Odit architecto suscipit consectetur saepe. Eos dolorum, impedit cupiditate repudiandae sint, voluptate ullam esse debitis commodi adipisci reprehenderit expedita voluptatem delectus sed accusamus cumque ducimus hic mollitia animi maiores laboriosam perferendis? Eaque, quia eligendi repudiandae, sit omnis alias quidem vel voluptas, fuga ad dolorum ex quo modi provident facilis dicta obcaecati aperiam qui natus accusantium et. Dolores modi alias magnam vero inventore labore ratione nesciunt voluptatem debitis laboriosam voluptatibus quidem, officia quae velit asperiores consequatur dignissimos quibusdam? Quae ducimus, exercitationem est nobis ab optio aliquid sit nemo nulla. Reiciendis, est ipsum? Maxime natus exercitationem a porro eaque numquam atque amet maiores quo velit, inventore libero doloribus consequatur architecto deserunt obcaecati est non. Natus, minima maiores libero nihil dolor eveniet excepturi maxime id vero amet soluta corporis. Eum, est placeat mollitia iusto saepe accusantium dicta unde corrupti voluptatum. Repellendus facere dicta porro aliquid libero vel illo velit blanditiis placeat esse beatae adipisci officiis, illum enim nobis soluta ab eum minus optio, qui ex a quaerat, culpa architecto. Ipsum labore tempore necessitatibus vel quas quos! Quasi cumque temporibus commodi maiores enim laudantium nobis harum, natus odio minus eaque pariatur voluptatum sequi exercitationem voluptatibus quaerat explicabo obcaecati laboriosam, provident eos aliquam nulla, non possimus. Nihil voluptates officiis assumenda quos quae corporis. Fugit, odit explicabo voluptatem vitae aspernatur doloribus saepe aut laboriosam deleniti debitis cumque tempore soluta eos non commodi incidunt provident facilis ab dignissimos nisi maxime quibusdam error ipsum? Nostrum, quaerat quibusdam. Aperiam quas voluptates voluptatum temporibus libero, explicabo assumenda dolorum harum optio, itaque possimus est facere, eveniet a reprehenderit fuga neque fugiat sed adipisci facilis totam dolor porro doloribus aliquid! Voluptatum magnam reiciendis iste omnis consequuntur. Aperiam error quibusdam laboriosam tempora harum rerum molestiae alias accusamus laudantium! Quam non magni reprehenderit nisi laboriosam est, magnam itaque nihil id at possimus vel soluta in suscipit labore voluptas deleniti, adipisci officiis et fugit saepe eius accusamus laborum. Explicabo, vitae recusandae. Quidem laudantium quod ut facere minus sunt cumque, doloribus quas ipsa ipsam distinctio voluptatibus dicta deleniti aut quibusdam possimus at. Non commodi et, ea ut ducimus ipsa officiis dolorum quasi, consequatur fugit sequi? Delectus error minus, aspernatur ab repudiandae repellendus non. Architecto in atque tempora facilis enim dicta, ex obcaecati illo culpa. Quibusdam laudantium officia enim ratione sunt, reiciendis officiis nobis consequatur, velit mollitia natus fugiat, voluptatibus id corrupti fuga debitis minima vero harum! Beatae commodi distinctio odio voluptates culpa delectus at molestiae nulla. Aperiam maxime id ipsam, magni tempora laborum atque fugiat recusandae molestiae vero sint omnis quia magnam placeat eum. Modi unde iste optio, laborum earum voluptas doloribus doloremque, ullam et placeat nulla blanditiis dolorem neque? Sint beatae blanditiis perferendis excepturi quasi vitae, saepe doloremque, quisquam odio exercitationem veniam velit, amet odit nemo natus quidem aliquam delectus ut? Doloremque possimus nam officiis placeat veniam nisi assumenda aliquam mollitia veritatis molestias provident, voluptatum sed deserunt sit amet, quidem cumque laudantium illum neque, sint saepe. Velit, esse! Veritatis aliquid possimus sint maiores officiis inventore sit deserunt quas temporibus. Repellat perferendis et debitis minima excepturi expedita non aliquam fugiat, quidem molestias perspiciatis culpa voluptate reprehenderit, tenetur asperiores vero. Dolorum eligendi dolore officiis, minus beatae optio assumenda repudiandae aperiam? Excepturi iste nobis, nesciunt tempore doloribus quibusdam harum sunt assumenda perspiciatis doloremque perferendis fugiat vero totam. Consequatur sequi quo nisi architecto nostrum consectetur magni praesentium dolores eaque repellendus quia, deleniti vitae necessitatibus modi ratione tenetur blanditiis porro beatae deserunt cumque unde excepturi iste! Atque cum eum harum facere reprehenderit perferendis nobis nulla, possimus voluptate illum quod optio doloremque delectus a corporis velit ut fugiat repudiandae alias molestiae voluptatum veniam magnam? Eaque porro harum laboriosam blanditiis deleniti quis praesentium ullam mollitia autem totam. In, rem, tempore dolores asperiores esse recusandae sit officiis id soluta quae nemo illo minus eum est molestiae nesciunt magni ducimus assumenda sapiente qui praesentium. Cumque deleniti possimus, dolorum suscipit quae aliquam voluptas corporis expedita commodi illum deserunt, ex cupiditate necessitatibus ducimus velit, natus quis maiores excepturi maxime quibusdam veritatis ipsam? Doloremque, atque suscipit. Voluptas laborum repudiandae commodi tenetur voluptatum ab eum, omnis earum libero odit nam facilis. Eaque doloremque earum accusantium voluptatibus tenetur aut expedita! Neque totam dolor fuga quasi quisquam officia earum deserunt, veritatis necessitatibus, doloribus id qui exercitationem blanditiis ab ipsam. Fuga assumenda a, nemo voluptatem magnam at possimus inventore, eligendi commodi voluptatum esse enim eaque illum nam vero animi explicabo minus autem corporis natus! Aliquid molestiae atque, deserunt quia odio, non assumenda aspernatur quos velit aperiam eveniet optio illum similique, eligendi laborum quasi. Praesentium, ut officia esse alias cupiditate est fugit maxime accusantium. Commodi fugiat tempora iusto quam minima tempore. Cum consequuntur velit consequatur deleniti hic nisi, expedita a perspiciatis totam corporis quaerat autem et iusto cumque, accusantium necessitatibus. Explicabo veritatis laudantium sit odit atque? Nihil in quae repellat voluptate, quaerat voluptas amet nostrum, ut, rem reprehenderit at obcaecati. Aut reprehenderit vero assumenda maiores dolore exercitationem, obcaecati ut tempore totam minus iure fugiat consectetur numquam expedita ad perspiciatis eius rem reiciendis? Accusamus iusto voluptatibus animi aliquam incidunt similique explicabo repellat quas vel eaque quod possimus asperiores fugiat nobis iure perspiciatis reiciendis adipisci quibusdam, dolores magni. Tempora sed, quod ratione nemo soluta sapiente nobis recusandae quidem, minima fuga beatae maxime accusamus modi similique magnam nam non, accusantium voluptas iusto? Omnis sit deserunt voluptates quo vel voluptatum et nam voluptatibus culpa eveniet dignissimos fuga iusto temporibus ex atque perferendis deleniti eaque obcaecati esse laboriosam dolore fugiat accusamus, quam error? Voluptas dignissimos, ipsa tempore laudantium soluta facilis consequatur eaque, beatae ducimus veniam, tempora id. Minus neque est voluptas porro fugiat expedita sint id dolor perspiciatis assumenda sunt laudantium blanditiis suscipit, velit unde dolores ducimus quis! Accusantium maxime earum explicabo incidunt rerum corporis, enim iure commodi error adipisci id reprehenderit eaque quia nisi facere repellat ab illo consequuntur dolore accusamus? Aut odit temporibus minus dignissimos possimus quo ea magnam, facilis inventore obcaecati placeat deleniti nam. Cum quia, quidem adipisci odio ullam distinctio tempora voluptates iusto ratione sunt temporibus autem illo modi provident a accusantium asperiores reiciendis officia commodi. Voluptates est, ipsa non error ab nulla alias ipsum excepturi doloribus deserunt praesentium aperiam sapiente asperiores ipsam, illo inventore! Error aliquam doloremque porro deleniti nobis voluptatem explicabo laborum consequatur deserunt? Tenetur eos quasi asperiores, architecto temporibus, illo, possimus impedit fugiat ipsam laborum dolorum! Harum nisi ab perferendis quod explicabo sed, esse reprehenderit consequatur suscipit sint. Quo veniam quia, consectetur tenetur quisquam architecto et labore minus? Eaque earum sit est quasi molestiae rem iusto, ullam velit distinctio suscipit iure quisquam debitis. Assumenda explicabo repellendus at alias nam ab cumque. Explicabo cum nulla numquam temporibus aut architecto placeat harum similique, eveniet ratione dignissimos suscipit ut, aspernatur nihil magnam iure, vitae ipsam tempora cupiditate. Illo, laboriosam ratione! Minus excepturi minima nemo reiciendis rem itaque, dolorem nesciunt, consequatur optio explicabo praesentium est at beatae. Debitis iste sunt, officia hic repellendus consequatur facere aliquid aliquam perspiciatis esse, explicabo, ullam nostrum exercitationem inventore expedita earum aut nesciunt. Quidem pariatur corrupti eum aliquid atque porro fugit. Et esse, maxime accusantium accusamus perferendis sed tenetur illum molestias! Nobis ipsa distinctio, dolore nesciunt minus maxime quisquam ut commodi voluptate quidem doloribus nostrum deleniti quibusdam recusandae eveniet, labore animi fugit! Hic similique, consectetur molestiae soluta facilis obcaecati, maxime alias assumenda sint doloribus velit? Repudiandae tempora neque velit et ratione ex sint harum, eos voluptate ea porro, magni dignissimos! Maxime, modi nemo! Autem excepturi doloribus dolor at harum consequatur soluta, voluptate fuga eos, repudiandae debitis, qui porro quod sint iste tempore aliquid doloremque voluptas? Accusantium nesciunt, accusamus ut voluptatem facere eos cum est. Quibusdam, odit laudantium eligendi voluptatum nobis dolor hic ullam animi vero et cum. Optio rem necessitatibus recusandae doloribus consequatur officiis dolorem, excepturi repudiandae, architecto delectus quia vitae quos fugiat soluta, aperiam animi esse perspiciatis quaerat reprehenderit magni eveniet dolorum fugit ipsum? Quis quae magni numquam nam saepe nihil officiis quo iste qui unde, sit facere itaque laudantium blanditiis consequuntur minus! Error vel qui id quibusdam? Est odio asperiores dolorem natus debitis aspernatur at, totam illo tempore fugiat enim repudiandae amet unde, ullam maxime commodi nam laborum tempora impedit a? Iste, id! Neque officia deserunt illum eveniet in reiciendis dolor. Natus cumque omnis cupiditate incidunt accusantium sed ad mollitia officia repellendus, ullam aliquam esse molestias recusandae sunt, fugiat quia deserunt sequi eius quas dignissimos totam reiciendis itaque. Recusandae, necessitatibus. Recusandae, porro totam laboriosam iure nihil harum commodi ab eveniet mollitia dolorem? Nisi officia quibusdam facere, quod doloribus voluptatum, repellendus vel quae ipsam voluptate, quasi animi dignissimos quidem ipsa ipsum quam et accusantium beatae soluta adipisci! Nostrum, sed possimus cupiditate sint, delectus atque, eligendi odit rerum nihil ratione odio tempore libero. Iusto consequatur at delectus soluta voluptatum. Minima est illum nemo fugiat at impedit pariatur a nostrum quas, distinctio obcaecati officiis, esse ipsum, inventore rerum accusantium ab recusandae earum voluptatum quae asperiores eos voluptas facilis vitae. Iusto, ipsum deleniti praesentium cupiditate ipsa facere cum dolores repudiandae accusamus!
                </div>
            </div>
        </MainLayout>
    )
}

export default index