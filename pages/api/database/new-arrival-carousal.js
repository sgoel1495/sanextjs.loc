//

/**
 * NewArrivalsCarousal API Call
 * class NewArrivalsCarousal
 *   include Mongoid::Document
 *   field :is_mob_visible, type: Mongoid::Boolean
 *   field :is_web_visible, type: Mongoid::Boolean
 *   field :is_visible, type: Mongoid::Boolean
 *   field :imgs, type: Array
 *   field :foreground_path, type: String
 * end
 * NewArrivalsCarousal.where({ :case_of => 'home_page' }).to_a
 * new_arr_car.each do |car|
 *             if car['is_mob_visible']
 *               # 0
 *               car['imgs'].delete_at(0)
 *               car['links'].delete_at(0)
 *               NewArrivalsCarousal.where({ :$and => [{ :case_of => 'home_page' }, { :is_mob_visible_ => true }] }).update({ :imgs => car['imgs'], :links => car['links'] })
 *             else
 *               #1
 *               car['imgs'].delete_at(1)
 *               car['links'].delete_at(1)
 *               NewArrivalsCarousal.where({ :$and => [{ :case_of => 'home_page' }, { :is_mob_visible_ => false }] }).update({ :imgs => car['imgs'], :links => car['links'] })
 */

export default (req, res) => {
    console.log(req.path);
    res.status(200).json({ images: [
        {
        "imgs" : "imgs",
        "links" : "links",
        "is_mobile_visible" : false
        }]})
}
